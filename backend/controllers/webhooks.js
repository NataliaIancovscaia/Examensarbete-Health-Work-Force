import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
   
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

  
    const handlers = {
      "user.created": async (data) => {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
      },
      "user.updated": async (data) => {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
      },
      "user.deleted": async (data) => {
        await User.findByIdAndDelete(data.id);
      },
    };

    const handler = handlers[type];
    if (handler) {
      await handler(data);
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Unknown event type" });
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(500).json({ success: false, message: "Webhooks error" });
  }
};
