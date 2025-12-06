import "dotenv/config";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

import { Sentry } from "./config/instrument.js"; 
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

const app = express();

app.use(cors());


app.use((req, res, next) => {
  const methodsWithBody = ["POST", "PUT", "PATCH"];
  if (methodsWithBody.includes(req.method) && req.headers["content-type"]?.includes("application/json")) {
    express.json({
      strict: true,
      limit: "1mb",
      verify: (req, res, buf) => {
        req.rawBody = buf.toString();
      },
    })(req, res, next);
  } else {
    next();
  }
});


app.use((err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    "body" in err &&
    ["POST", "PUT", "PATCH"].includes(req.method)
  ) {
    console.error("Invalid JSON received:", req.rawBody || err.body);
    return res.status(400).json({
      success: false,
      message: "Invalid JSON body",
    });
  }
  next(err);
});


let isDbConnected = false;
const ensureDbConnection = async () => {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;
    console.log("MongoDB Connected (cold start)");
  }
};

app.get("/", (req, res) => res.json({ success: true, message: "API Working" }));


app.get("/debug-sentry", (req, res, next) => {
  try {
    throw new Error("Sentry test error!");
  } catch (err) {
    Sentry.captureException(err);
    next(err); 
  }
});


app.post("/webhooks", (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: "Empty body" });
  }
  clerkWebhooks(req, res, next);
});


app.use((err, req, res, next) => {
  console.error(err);
  Sentry.captureException(err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


process.on("uncaughtException", (err) => {
  Sentry.captureException(err);
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  Sentry.captureException(err);
  console.error("Unhandled Rejection:", err);
});


const isLocal = process.env.LOCAL?.toLowerCase() === "true";
if (isLocal) {
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
    console.error("Server error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default handler;












