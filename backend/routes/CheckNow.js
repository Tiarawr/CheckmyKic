require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB Config
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "", // sesuaikan
  database: "checkmykicks", // ganti dengan nama database kamu
};

// Root
app.get("/", (req, res) => {
  res.send("Welcome to the CheckMyKicks backend!");
});

// ✅ POST /api/checknow — langsung di sini
app.post("/api/checknow", upload.array("photos", 8), async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const { email, brands, model } = req.body;
    const photos = req.files;

    // Cari atau buat user
    const [user] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    let userId;
    if (user.length === 0) {
      const [result] = await connection.execute(
        "INSERT INTO users (email) VALUES (?)",
        [email]
      );
      userId = result.insertId;
    } else {
      userId = user[0].id;
    }

    // Simpan ke shoes
    const filenames = JSON.stringify(photos.map((file) => file.filename));
    const [shoeRes] = await connection.execute(
      `INSERT INTO shoes (user_id, image_url, status, result, created_at, email)
       VALUES (?, ?, 'pending', NULL, NOW(), ?)`,
      [userId, filenames, email]
    );
    const shoeId = shoeRes.insertId;

    // Simpan ke payment
    await connection.execute(
      `INSERT INTO payment (shoe_id, status, paid_at)
       VALUES (?, 'unpaid', NULL)`,
      [shoeId]
    );
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
});

// Tes
app.get("/test", (req, res) => {
  res.send("Server jalan!");
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
