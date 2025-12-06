import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // Определяем локальный запуск
    const isLocal = process.env.LOCAL && process.env.LOCAL.toLowerCase() === "true";
    console.log("LOCAL:", process.env.LOCAL, "isLocal:", isLocal);

    // Проверка подписи только на продакшне
    if (!isLocal) {
      const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
      await whook.verify(JSON.stringify(req.body), {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      });
    } else {
      console.log("Local test: skipping webhook verification");
    }

    const { data, type } = req.body;

    if (!data || !type) {
      console.warn("Webhook received without type or data", req.body);
      return res.status(400).json({ success: false, message: "Invalid webhook payload" });
    }

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url ||"default.png",
      resume: "",
    };

    if (type === "user.created") {
      await User.create(userData);
      console.log("User created:", userData._id);
    } else if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, userData);
      console.log("User updated:", userData._id);
    } else if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      console.log("User deleted:", userData._id);
    } else {
      console.log("Unhandled webhook type:", type);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(500).json({ success: false, message: "Webhooks error" });
  }
};

