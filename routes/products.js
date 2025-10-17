import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get filtered products
router.get("/filter", async (req, res) => {
  try {
    const { minPrice, maxPrice, category, search } = req.query;

    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (minPrice) {
      query += " AND price >= ?";
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += " AND price <= ?";
      params.push(Number(maxPrice));
    }

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    if (search) {
      query += " AND (name LIKE ? OR description LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
