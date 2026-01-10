import app from "./app.js";
import { connectDB } from "./config/dbConfig.js";
import "./config/redisConfig.js";
import { serverConfig } from "./config/serverConfig.js";

const startServer = async () => {
  await connectDB();

  app.listen(serverConfig.port, () => {
    console.log(`🚀 Server running on port ${serverConfig.port}`);
  });
};

startServer();
