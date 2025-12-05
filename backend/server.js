import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import Sentry from "./config/instrument.js";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/debug-sentry", (req, res, next) => {
  next(new Error("My first Sentry error!")); 
});


app.use((err, req, res, next) => {
  console.error("Express Error:", err.message);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});





