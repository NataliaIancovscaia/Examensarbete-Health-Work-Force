import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    mongoose.connection.on('error', (err) => console.log('Database Error:', err));

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log('MongoDB Connection Failed:', err);
    process.exit(1);
  }
};

export default connectDB;

