import app from "./app.js";
import { connectDB } from "./config/dbConfig.js";
import "./config/redisConfig.js";
import { redisConnection } from "./config/redisConfig.js";
import { serverConfig } from "./config/serverConfig.js";
import { startImportCron } from "./cron/cron.js";
import { jobWorker } from "./queues/jobWorker.js";

let server;

const startServer = async () => {
  await connectDB();

  startImportCron();

  app.listen(serverConfig.port, () => {
    console.log(`🚀 Server running on port ${serverConfig.port}`);
  });
};

startServer();

const shutdown = async (signal) => {
  console.log(`🛑 Received ${signal}. Shutting down gracefully...`);

  try {
    // stop accepting new HTTP requests
    server.close(() => {
      console.log("🛑 HTTP server closed");
    });

    // stop BullMQ worker
    if (jobWorker) {
      await jobWorker.close();
      console.log("🛑 Worker closed");
    }

    // close Redis connection
    if (redisConnection) {
      await redisConnection.quit();
      console.log("🛑 Redis connection closed");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
