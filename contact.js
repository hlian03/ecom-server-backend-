// server/routes/contact.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Post contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Insert into database
    const [result] = await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.status(201).json({
      message: "Contact message saved successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
