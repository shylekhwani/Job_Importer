import mongoose from "mongoose";
import { serverConfig } from "./serverConfig.js";

export const connectDB = async (req, res, next) => {
  try {
    await mongoose.connect(serverConfig.mongoUri, {
      autoIndex: true,
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    next(error);
  }
};
