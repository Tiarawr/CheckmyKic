const axios = require("axios");
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "checkmykicks",
};

const XENDIT_SECRET_KEY =
  "xnd_development_PlP72kJlCOQdBCT33MICFuMODMkRgObkM2BEdoPQiSUOjBPfFqD5IIEdjfaYb";

router.post("/create-qris", async (req, res) => {
  const { shoe_id, amount } = req.body;

  if (!shoe_id || !amount) {
    return res.status(400).json({ error: "shoe_id dan amount wajib diisi." });
  }

  const connection = await mysql.createConnection(dbConfig);

  try {
    const externalId = "testqris_" + Date.now();

    // Simpan ke tabel payment
    await connection.execute(
      "INSERT INTO payments (shoe_id, status, paid_at, external_id) VALUES (?, 'unpaid', NULL, ?)",
      [shoe_id, externalId]
    );

    // Buat QRIS dinamis ke Xendit
    const { data } = await axios.post(
      "https://api.xendit.co/qr_codes",
      {
        external_id: externalId,
        type: "DYNAMIC",
        callback_url: "https://4fb5-157-10-8-222.ngrok-free.app/webhook/qris",
        amount: parseInt(amount),
      },
      {
        auth: { username: XENDIT_SECRET_KEY, password: "" },
      }
    );

    console.log("[XENDIT RESPONSE]", data); // ✅ Log di sini

    res.json({
      qr_string: data.qr_string,
      qr_url: data.qr_url,
      external_id: externalId,
    });
  } catch (err) {
    console.error("[ERROR QRIS]", err.response?.data || err.message);
    res.status(500).json({ error: "Gagal membuat QRIS" });
  } finally {
    await connection.end();
  }
});

module.exports = router;
