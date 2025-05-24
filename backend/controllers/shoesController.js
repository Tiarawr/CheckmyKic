const db = require("../models/db");
const path = require("path");


exports.uploadShoe = (req, res) => {
  const email = req.body.email;
  const images = req.files;

  if (!images || images.length === 0) {
    return res.status(400).json({ error: "No images uploaded" });
  }

  const filenames = images.map((file) => file.filename);

  // Step 1: Cek apakah email sudah ada di database
  const checkUserQuery = "SELECT id FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error("Error cek email:", err);
      return res.status(500).json({ error: "Gagal cek email" });
    }

    const proceedUpload = (userId) => {
      const insertQuery = "INSERT INTO shoes (user_id, image_url, status, created_at) VALUES ?";
      const now = new Date();
      const values = filenames.map((filename) => [userId, filename, "pending", now]);

      db.query(insertQuery, [values], (err, result) => {
        if (err) {
          console.error("Gagal simpan ke DB:", err);
          return res.status(500).json({ error: "Gagal simpan ke DB" });
        }
        res.status(200).json({ message: "Upload sukses", data: filenames });
      });
    };

    if (results.length > 0) {
      // Email sudah ada
      const userId = results[0].id;
      proceedUpload(userId);
    } else {
      // Email belum ada, simpan dulu ke users
      const insertUserQuery = "INSERT INTO users (email) VALUES (?)";
      db.query(insertUserQuery, [email], (err, insertResult) => {
        if (err) {
          console.error("Gagal simpan email:", err);
          return res.status(500).json({ error: "Gagal simpan email" });
        }
        const newUserId = insertResult.insertId;
        proceedUpload(newUserId);
      });
    }
  });
};

