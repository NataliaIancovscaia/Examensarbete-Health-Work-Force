import "dotenv/config";
import express from "express";
import cors from "cors";
import { Sentry } from "./config/instrument.js";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

await connectCloudinary();

app.use(cors());

app.use((req, res, next) => {
  const methodsWithBody = ["POST", "PUT", "PATCH"];
  if (
    methodsWithBody.includes(req.method) &&
    req.headers["content-type"]?.includes("application/json")
  ) {
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

app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.json({ success: true, message: "API Working" });
});

app.get("/debug-sentry", (req, res, next) => {
  try {
    throw new Error("Sentry test error!");
  } catch (err) {
    Sentry.captureException(err);
    next(err);
  }
});

app.post("/webhooks", (req, res, next) => {
  if (!req.rawBody || req.rawBody.length === 0) {
    return res.status(400).json({ success: false, message: "Empty body" });
  }
  clerkWebhooks(req, res, next);
});

app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  Sentry.captureException(err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

let isConnected = false;

async function ensureDbConnection() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("MongoDB Connected (cold start)");
  }
}

if (process.env.LOCAL === "true") {
  (async () => {
    await ensureDbConnection();
    app.listen(5000, () =>
      console.log("Local server running on http://localhost:5000"),
    );
  })();
}

export default async function handler(req, res) {
  try {
    await ensureDbConnection();
    return app(req, res);
  } catch (err) {
    console.error(err);
    Sentry.captureException(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
