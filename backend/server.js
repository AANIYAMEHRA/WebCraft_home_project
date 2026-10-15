import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Webcraft backend is running" });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  });