import cron from "node-cron";

import { logger } from "../utils/logger.js";
import { runImport } from "../modules/runImportModule.js";

/**
 * Runs every hour at minute 0
 * 0 * * * *
 */
export const startImportCron = () => {
  cron.schedule("0 * * * *", async () => {
    logger.info("⏰ Cron started: Job import");

    try {
      await runImport();
      logger.info("✅ Cron import triggered successfully");
    } catch (error) {
      logger.error("❌ Cron import failed", error.message);
    }
  });
};
