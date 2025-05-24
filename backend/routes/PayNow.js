const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// DB config
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "checkmykicks",
};

// Simulasi pembayaran manual
router.post("/manual-payment", async (req, res) => {
  const { account_number, amount } = req.body;

  if (!account_number || !amount) {
    return res.status(400).json({
      error: "account_number dan amount wajib diisi",
    });
  }

  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM payments WHERE account_number = ? AND amount = ?",
      [account_number, amount]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Pembayaran tidak ditemukan atau tidak cocok" });
    }

    await connection.execute(
      "UPDATE payments SET status = 'paid', paid_at = NOW() WHERE account_number = ?",
      [account_number]
    );

    res.json({ message: "✅ Simulasi pembayaran berhasil" });
  } catch (err) {
    console.error("[ERROR SIMULASI BAYAR]", err);
    res.status(500).json({ error: "Gagal update pembayaran" });
  } finally {
    await connection.end();
  }
});

module.exports = router;
