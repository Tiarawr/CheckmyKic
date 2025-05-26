require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2/promise");
const axios = require("axios");
const { sendPaymentSuccessEmail } = require("./emailService");

const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "checkmykicks",
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM admins WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Username tidak ditemukan" });
    }

    const user = rows[0];
    console.log("USERNAME INPUT:", username);
    console.log("PASSWORD INPUT:", password);
    console.log("HASH FROM DB:", user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("MATCH RESULT:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password salah" });
    }

    return res.json({ token: "adminTokenValid" }); // atau pakai JWT
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Login gagal" });
  } finally {
    await connection.end();
  }
});

app.post("/api/checknow", upload.array("photos", 8), async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const { email, brands, model } = req.body;
    if (!email || !brands || !model || !req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    console.log("[CHECKNOW PAYLOAD]", {
      email,
      brands,
      model,
      files: req.files.map((f) => f.filename),
    });

    const [users] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    const userId = users.length
      ? users[0].id
      : (
          await connection.execute("INSERT INTO users (email) VALUES (?)", [
            email,
          ])
        )[0].insertId;

    const imageNames = JSON.stringify(
      req.files.map((f) => `/uploads/${f.filename}`)
    );
    const [shoeResult] = await connection.execute(
      `INSERT INTO shoes (user_id, image_url, status, result, created_at, email, brands, model)
   VALUES (?, ?, 'waiting', NULL, NOW(), ?, ?, ?)`,
      [userId, imageNames, email, brands, model]
    );

    const shoeId = shoeResult.insertId;

    await connection.execute(
      `INSERT INTO payments (shoe_id, status, paid_at, account_number, bank_code, amount, va_id)
       VALUES (?, 'unpaid', NULL, NULL, NULL, 50000, NULL)`,
      [shoeId]
    );

    return res.json({ message: "Data berhasil disimpan!", shoe_id: shoeId });
  } catch (err) {
    console.error("[ERROR CHECKNOW]", err);
    return res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.get("/api/shoes", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(`
      SELECT 
        s.id,
        s.brands,
        s.model,
        JSON_UNQUOTE(JSON_EXTRACT(s.image_url, '$[0]')) AS image_url,
        s.result
      FROM shoes s
      WHERE s.result IS NOT NULL -- ✅ ambil PASS & NOT PASS
      ORDER BY s.created_at DESC
    `);

    const result = rows.map((row) => ({
      name: `${row.brands} ${row.model}`,
      image: `/uploads/${row.image_url}`,
      status: row.result.toUpperCase(), // biar konsisten
    }));

    res.json(result);
  } catch (err) {
    console.error("[ERROR GET /api/shoes]", err);
    res.status(500).json({ error: "Gagal mengambil data sepatu" });
  } finally {
    await connection.end();
  }
});

app.get("/api/payment-status/:shoe_id", async (req, res) => {
  const { shoe_id } = req.params;
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(
      "SELECT status FROM payments WHERE shoe_id = ?",
      [shoe_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    return res.json({ status: rows[0].status });
  } catch (err) {
    console.error("[ERROR payment-status]", err);
    return res.status(500).json({ error: "Gagal ambil status pembayaran" });
  } finally {
    await connection.end();
  }
});

app.get("/api/admin/orders-with-shoes", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(`
      SELECT 
        s.id AS shoe_id,
        s.user_id,
        s.email,
        s.brands,
        s.model,
        s.status,
        s.result,
        s.created_at,
        s.image_url,
        p.amount,
        p.account_number,
        p.bank_code,
        p.va_id,
        p.status AS payment_status,
        p.paid_at
      FROM shoes s
      LEFT JOIN payments p ON s.id = p.shoe_id
      ORDER BY s.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("[ERROR admin/orders-with-shoes]", err);
    res.status(500).json({ error: "Gagal mengambil data order dengan join" });
  } finally {
    await connection.end();
  }
});

app.post("/api/create-va", async (req, res) => {
  const { bank_code, name, expected_amount, shoe_id } = req.body;

  if (!bank_code || !name || !expected_amount || !shoe_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const connection = await mysql.createConnection(dbConfig);
  try {
    const response = await axios.post(
      "https://api.xendit.co/callback_virtual_accounts",
      {
        external_id: `va-${Date.now()}`,
        bank_code,
        name,
        is_closed: true,
        expected_amount,
      },
      {
        auth: {
          username: process.env.XENDIT_API_KEY,
          password: "",
        },
        headers: { "Content-Type": "application/json" },
      }
    );

    const vaData = response.data;

    const [result] = await connection.execute(
      `UPDATE payments
       SET account_number = ?, bank_code = ?, amount = ?, va_id = ?
       WHERE shoe_id = ?`,
      [
        vaData.account_number,
        vaData.bank_code,
        vaData.expected_amount,
        vaData.id,
        shoe_id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Gagal update payment" });
    }

    res.json({ ...vaData, updated: true, shoe_id });
  } catch (err) {
    console.error("[ERROR CREATE VA]", err.response?.data || err.message);
    res.status(500).json({ error: "Gagal membuat VA" });
  } finally {
    await connection.end();
  }
});

app.post("/api/manual-payment", async (req, res) => {
  const { account_number, amount } = req.body;
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(
      `SELECT p.shoe_id, s.email
       FROM payments p
       JOIN shoes s ON p.shoe_id = s.id
       WHERE p.account_number = ? AND p.amount = ?`,
      [account_number, amount]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "VA tidak ditemukan atau jumlah tidak cocok" });
    }

    const { shoe_id, email } = rows[0];

    const [update] = await connection.execute(
      `UPDATE payments SET status = 'paid', paid_at = NOW() WHERE account_number = ?`,
      [account_number]
    );

    if (update.affectedRows === 0) {
      return res.status(500).json({ error: "Gagal mengupdate pembayaran" });
    }

    const [shoeUpdate] = await connection.execute(
      `UPDATE shoes SET status = 'processing' WHERE id = ?`,
      [shoe_id]
    );

    console.log("[UPDATE SHOES RESULT]", shoeUpdate);

    await sendPaymentSuccessEmail(email, shoe_id);
    res.json({ message: "Pembayaran berhasil & email dikirim." });
  } catch (err) {
    console.error("[ERROR MANUAL PAYMENT]", err);
    res.status(500).json({ error: "Gagal update pembayaran atau email" });
  } finally {
    await connection.end();
  }
});

app.post("/api/admin/update-result", async (req, res) => {
  const { shoe_id, result } = req.body;
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Update result in DB
    await connection.execute(`UPDATE shoes SET result = ? WHERE id = ?`, [
      result,
      shoe_id,
    ]);

    // Ambil data untuk email
    const [rows] = await connection.execute(
      `SELECT s.email, s.brands, s.model FROM shoes s WHERE s.id = ?`,
      [shoe_id]
    );

    if (rows.length > 0) {
      const { email, brands, model } = rows[0];

      if (result === "pass") {
        const issueDate = new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const productId = `${
          brands?.substring(0, 2).toUpperCase() || "XX"
        }${shoe_id}-${
          model?.replace(/\s+/g, "").substring(0, 6).toUpperCase() || "XXXXXX"
        }`;

        const certData = {
          customerEmail: email,
          itemName: `${brands} ${model}`,
          productId,
          issueDate,
          orderId: shoe_id,
        };

        await sendPaymentSuccessEmail(email, shoe_id, "pass", certData);
      } else if (result === "not pass") {
        await sendPaymentSuccessEmail(email, shoe_id, "not pass");
      }
    }

    res.json({ message: "Result updated and email sent if applicable." });
  } catch (err) {
    console.error("[ADMIN UPDATE RESULT ERROR]", err);
    res.status(500).json({ error: "Failed to update result" });
  } finally {
    await connection.end();
  }
});

app.post("/api/admin/send-certificate", async (req, res) => {
  const { orderId, certificateData } = req.body;

  if (
    !certificateData?.customerEmail ||
    !certificateData?.itemName ||
    !certificateData?.issueDate ||
    !certificateData?.productId
  ) {
    return res.status(400).json({ error: "Data sertifikat tidak lengkap" });
  }

  try {
    await sendPaymentSuccessEmail(
      certificateData.customerEmail,
      orderId,
      "pass",
      certificateData
    );

    res.json({ message: "Certificate email sent with PDF successfully." });
  } catch (err) {
    console.error("[ERROR SEND CERTIFICATE PDF]", err);
    res.status(500).json({ error: "Gagal mengirim email dengan PDF." });
  }
});

app.get("/api/admin/orders", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(`
  SELECT
    s.id AS shoe_id,
    s.email,
    s.status,
    s.result,
    s.image_url,
    s.brands,
    s.model,
    p.amount,
    p.account_number,
    p.bank_code,
    p.va_id,
    p.paid_at
  FROM shoes s
  LEFT JOIN payments p ON s.id = p.shoe_id
  ORDER BY s.created_at DESC
`);

    res.json(rows);
  } catch (err) {
    console.error("[ERROR ADMIN ORDERS]", err);
    res.status(500).json({ error: "Gagal mengambil data order" });
  } finally {
    await connection.end();
  }
});

app.get("/test-email", async (req, res) => {
  try {
    await sendPaymentSuccessEmail("kicksmycheck@gmail.com", 999);
    res.send("Email test terkirim");
  } catch (err) {
    console.error("Test email error:", err);
    res.status(500).send("Gagal kirim email");
  }
});

app.get("/test", (req, res) => {
  res.send("Server jalan!");
});

app.listen(PORT, () => {
  console.log(`✅ Server jalan di http://localhost:${PORT}`);
});
