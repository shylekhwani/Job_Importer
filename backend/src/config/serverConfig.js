import dotenv from "dotenv";

dotenv.config();

export const serverConfig = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  mongoUri: process.env.MONGO_URI,

  redisUri: process.env.REDIS_URL,
};
