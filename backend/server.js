require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup
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

// DB Config
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "checkmykicks",
};

// Route: Upload form
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
    let userId = user.length
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

//Tambahkan endpoint ini untuk frontend (/api/latest-shoe)
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

// Tes route
app.get("/test", (req, res) => {
  res.send("Server jalan!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
