require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2/promise");
const axios = require("axios");
const payNowRoutes = require("./routes/PayNow");

const app = express();
const PORT = process.env.PORT || 3000;

const { sendPaymentSuccessEmail } = require("./emailService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup upload folder
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

app.post("/api/manual-payment", async (req, res) => {
  const { account_number, amount } = req.body;
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(
      `SELECT payments.shoe_id, shoes.email 
       FROM payments 
       JOIN shoes ON payments.shoe_id = shoes.id 
       WHERE payments.account_number = ? AND payments.amount = ?`,
      [account_number, amount]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "VA tidak ditemukan atau jumlah tidak cocok" });
    }

    const { shoe_id, email } = rows[0];

    await connection.execute(
      "UPDATE payments SET status = 'paid', paid_at = NOW() WHERE account_number = ?",
      [account_number]
    );

    await sendPaymentSuccessEmail(email, shoe_id);

    res.json({ message: "Simulasi pembayaran berhasil & email terkirim." });
  } catch (err) {
    console.error("[ERROR MANUAL PAYMENT]", err);
    res.status(500).json({ error: "Gagal update status pembayaran" });
  } finally {
    await connection.end();
  }
});

// Database config
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "checkmykicks",
};

// Endpoint Upload Data

app.post("/api/checknow", upload.array("photos", 8), async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const { email, brands, model } = req.body;
    if (!email || !brands || !model || !req.files?.length) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const imageNames = JSON.stringify(req.files.map((f) => f.filename));
    const [user] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    const userId = user.length
      ? user[0].id
      : (
          await connection.execute("INSERT INTO users (email) VALUES (?)", [
            email,
          ])
        )[0].insertId;

    const [shoes] = await connection.execute(
      "INSERT INTO shoes (user_id, image_url, status, result, created_at, email) VALUES (?, ?, 'waiting', NULL, NOW(), ?)",
      [userId, imageNames, email]
    );

    await connection.execute(
      "INSERT INTO payments (shoe_id, status, paid_at) VALUES (?, 'unpaid', NULL)",
      [shoes.insertId]
    );

    res.json({ message: "Data berhasil disimpan!" });
  } catch (err) {
    console.error("[ERROR CHECKNOW]", err);
    res.status(500).json({ error: "Gagal menyimpan data" });
  } finally {
    await connection.end();
  }
});

// Ambil ID Sepatu Terakhir

app.get("/api/latest-shoe", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.execute(
      "SELECT id FROM shoes ORDER BY created_at DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No shoe found" });
    }

    res.json({ shoe_id: rows[0].id });
  } catch (err) {
    console.error("[ERROR LATEST SHOE]", err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await connection.end();
  }
});

// Buat VA via Xendit

app.post("/api/create-va", async (req, res) => {
  const { bank_code, name, expected_amount } = req.body;

  if (!bank_code || !name || !expected_amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const connection = await mysql.createConnection(dbConfig);

  try {
    const [shoeRows] = await connection.execute(
      "SELECT id FROM shoes ORDER BY created_at DESC LIMIT 1"
    );

    if (shoeRows.length === 0) {
      return res.status(404).json({ error: "Tidak ada data sepatu ditemukan" });
    }

    const shoe_id = shoeRows[0].id;

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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const vaData = response.data;

    const [updateResult] = await connection.execute(
      "UPDATE payments SET account_number = ?, bank_code = ?, amount = ?, va_id = ? WHERE shoe_id = ?",
      [
        vaData.account_number,
        vaData.bank_code,
        vaData.expected_amount,
        vaData.id,
        shoe_id,
      ]
    );

    if (updateResult.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Gagal update payment. Shoe_id tidak ditemukan." });
    }

    res.json({ ...vaData, updated: true, shoe_id });
  } catch (error) {
    console.error("[ERROR CREATE VA]", error.response?.data || error.message);
    res.status(500).json({
      error: "Gagal membuat VA",
      details: error.response?.data || error.message,
    });
  } finally {
    await connection.end();
  }
});

// Cek Status Pembayaran

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

    res.json({ status: rows[0].status });
  } catch (err) {
    console.error("[ERROR STATUS CHECK]", err);
    res.status(500).json({ error: "Gagal mengambil status pembayaran" });
  } finally {
    await connection.end();
  }
});

// Simulasi Pembayaran Manual

app.post("/api/manual-payment", async (req, res) => {
  const { account_number, amount } = req.body;
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(
      `SELECT payments.shoe_id, shoes.email 
       FROM payments 
       JOIN shoes ON payments.shoe_id = shoes.id 
       WHERE payments.account_number = ? AND payments.amount = ?`,
      [account_number, amount]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "VA tidak ditemukan atau jumlah tidak cocok" });
    }

    const { shoe_id, email } = rows[0];

    const [updateResult] = await connection.execute(
      "UPDATE payments SET status = 'paid', paid_at = NOW() WHERE account_number = ?",
      [account_number]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(500).json({ error: "Gagal mengupdate pembayaran" });
    }

    console.log("🔔 Kirim email ke:", email);
    await sendPaymentSuccessEmail(email, shoe_id);

    res.json({ message: "Simulasi pembayaran berhasil & email terkirim." });
  } catch (err) {
    console.error("[ERROR MANUAL PAYMENT]", err);
    res
      .status(500)
      .json({ error: "Gagal update status pembayaran & kirim email" });
  } finally {
    await connection.end();
  }
});

// test server
app.get("/test", (req, res) => {
  res.send("Server jalan!");
});

app.listen(PORT, () => {
  console.log(`✅ Server jalan di http://localhost:${PORT}`);
});

app.get("/test-email", async (req, res) => {
  try {
    await sendPaymentSuccessEmail("youremail@gmail.com", 999); // Ganti dengan emailmu
    res.send("Email test terkirim");
  } catch (err) {
    console.error("Test email error:", err);
    res.status(500).send("Gagal kirim email");
  }
});
