import "dotenv/config";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import Sentry from "./config/instrument.js";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Root route called");
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

let isDbConnected = false;

const ensureDbConnection = async () => {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;
    console.log("MongoDB Connected (cold start)");
  }
};


if (process.env.LOCAL === "true") {
  (async () => {
    await ensureDbConnection();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Local server running on http://localhost:${PORT}`)
    );
  })();
}


const handler = serverless(async (req, res) => {
  try {
    await ensureDbConnection(); 
    return app(req, res);
  } catch (err) {
    Sentry.captureException(err);
    console.error("Serverless handler error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default handler;


















