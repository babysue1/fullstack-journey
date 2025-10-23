const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import and immediately test database connection
const pool = require("./config/database");

// Test database connection on startup
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL database");
  }
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🚀 Task Manager API is running!" });
});

app.use("/api/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
