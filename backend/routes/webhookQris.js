const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "checkmykicks",
};

// Setup email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kickscheckmy@gmail.com",
    pass: "msjm dtob cejf jeqi",
  },
});

// Webhook listener
router.post("/webhook/qris", async (req, res) => {
  const { external_id, status } = req.body;

  if (status === "COMPLETED") {
    const connection = await mysql.createConnection(dbConfig);

    try {
      await connection.execute(
        "UPDATE payments SET status = 'paid', paid_at = NOW() WHERE external_id = ?",
        [external_id]
      );

      const [rows] = await connection.execute(
        `SELECT u.email FROM payments p
         JOIN shoes s ON p.shoe_id = s.id
         JOIN users u ON s.user_id = u.id
         WHERE p.external_id = ?`,
        [external_id]
      );

      if (rows.length) {
        await transporter.sendMail({
          from: '"CheckMyKicks" <kickscheckmy@gmail.com>',
          to: rows[0].email,
          subject: "Pembayaran Berhasil",
          text: "Terima kasih, pembayaran Anda sudah diterima. Kami akan segera memproses legit check Anda.",
        });
      }

      res.status(200).send("OK");
    } catch (error) {
      console.error("[WEBHOOK ERROR]", error);
      res.status(500).send("Gagal memproses");
    } finally {
      await connection.end();
    }
  } else {
    res.status(200).send("Status not handled");
  }
});

module.exports = router;
