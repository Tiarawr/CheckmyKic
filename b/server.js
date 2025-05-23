const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

const shoesRoutes = require("./routes/shoesRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve file gambar statis dari folder uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the CheckMyKicks backend!");
});

// Pakai routes shoes
app.use("/shoes", shoesRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("Server jalan!");
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
