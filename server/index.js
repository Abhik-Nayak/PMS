import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js"; // Import database connection

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Test API Route
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "API is working", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
