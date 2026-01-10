import { Redis } from "ioredis";
import { serverConfig } from "./serverConfig.js";

export const redisConnection = new Redis(serverConfig.redisUri, {
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("✅ Redis connected");
});

redisConnection.on("error", (err) => {
  console.error("❌ Redis error", err);
});
