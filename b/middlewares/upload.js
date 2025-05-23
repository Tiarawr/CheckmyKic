// middlewares/upload.js
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname).toLowerCase();
    cb(null, uniqueName);
  },
});

// Validasi hanya file gambar yang diperbolehkan
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diperbolehkan (jpg, jpeg, png, gif)"));
  }
};

// Konfigurasi upload
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimum 5MB per file
    files: 20,                 // Maksimum 20 file sekaligus
  },
});

module.exports = upload;
