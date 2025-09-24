// backend/server.js
import express from "express";
import cors from "cors";
import { mockData } from "./mockData.js";

const app = express();
app.use(cors());

// API endpoint for search suggestions
app.get("/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const results = mockData.filter(item => item.toLowerCase().includes(q));
  res.json(results);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
