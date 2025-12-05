import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
    mongoose.connection.on("error", (err) => console.error("MongoDB Error:", err));

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

export default connectDB;

