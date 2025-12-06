import "dotenv/config";
import express from "express";
import cors from "cors";
import Sentry from "./config/instrument.js";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

app.use(cors());
app.use(express.json());

// No top-level await here!
async function startServer() {
  await connectDB();

  app.get("/", (req, res) => {
    res.send("API Working");
  });

  app.post("/webhooks", clerkWebhooks);

  process.on("uncaughtException", (err) => {
    Sentry.captureException(err);
    console.error("Uncaught Exception:", err);
  });

  process.on("unhandledRejection", (err) => {
    Sentry.captureException(err);
    console.error("Unhandled Rejection:", err);
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on http://0.0.0.0:${PORT}`)
  );
}

startServer();












