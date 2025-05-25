require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2/promise");
const axios = require("axios");
const { sendPaymentSuccessEmail } = require("./emailService");

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

    const [shoeResult] = await connection.execute(
      `INSERT INTO shoes (user_id, image_url, status, result, created_at, email)
       VALUES (?, ?, 'waiting', NULL, NOW(), ?)`,
      [userId, imageNames, email]
    );
    const shoeId = shoeResult.insertId;

    await connection.execute(
      `INSERT INTO payments (shoe_id, status, paid_at, account_number, bank_code, amount, va_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [shoeId, "unpaid", null, null, null, 50000, null]
    );

    res.json({ message: "Data berhasil disimpan!", shoe_id: shoeId });
  } catch (err) {
    console.error("[ERROR CHECKNOW]", err);
    res.status(500).json({ error: "Gagal menyimpan data" });
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

    await sendPaymentSuccessEmail(email, shoe_id);
    res.json({ message: "Pembayaran berhasil & email dikirim." });
  } catch (err) {
    console.error("[ERROR MANUAL PAYMENT]", err);
    res.status(500).json({ error: "Gagal update pembayaran atau email" });
  } finally {
    await connection.end();
  }
});

app.get("/api/payment-status/:shoe_id", async (req, res) => {
  const { shoe_id } = req.params;
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(
      `SELECT status FROM payments WHERE shoe_id = ?`,
      [shoe_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    res.json({ status: rows[0].status });
  } catch (err) {
    console.error("[ERROR STATUS CHECK]", err);
    res.status(500).json({ error: "Gagal cek status pembayaran" });
  } finally {
    await connection.end();
  }
});

app.get("/test-email", async (req, res) => {
  try {
    await sendPaymentSuccessEmail("youremail@gmail.com", 999);
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
