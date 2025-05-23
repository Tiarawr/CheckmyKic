const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const shoesController = require("../controllers/shoesController");

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Pastikan folder uploads/ sudah ada
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("images", 20), shoesController.uploadShoe);
module.exports = router;
