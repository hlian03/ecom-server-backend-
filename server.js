// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import productsRouter from "./routes/products.js";
// import contactRouter from "./routes/contact.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (images, videos) from client/public
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use(
  "/video",
  express.static(path.join(__dirname, "../client/public/Video"))
);

// API routes
app.use("/api/products", productsRouter);
// app.use("/api/contact", contactRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
