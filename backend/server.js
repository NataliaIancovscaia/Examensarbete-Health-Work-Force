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


app.get("/", (req, res) => res.send("API Working"));
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
    try {
      await connectDB();
      isDbConnected = true;
    } catch (err) {
      Sentry.captureException(err);
      console.error("DB Connection Failed:", err);
      throw err;
    }
  }
};


let handler;


if (process.env.LOCAL === "true") {
  (async () => {
    await ensureDbConnection();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Local server running on http://localhost:${PORT}`));
  })();
} else {
 
  handler = serverless(async (req, res) => {
    try {
      await ensureDbConnection();
      return app(req, res);
    } catch (err) {
      Sentry.captureException(err);
      console.error("Server error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });
}


export { handler };















