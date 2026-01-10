import { Worker } from "bullmq";
import { JOB_QUEUE_NAME } from "./jobQueue.js";
import { upsertJob } from "../services/jobService.js";
import { incrementStatsService } from "../services/importlogService.js";
import { logger } from "../utils/logger.js";
import { redisConnection } from "../config/redisConfig.js";
import { serverConfig } from "../config/serverConfig.js";

export const jobWorker = new Worker(
  JOB_QUEUE_NAME,
  async (job) => {
    const { importLogId, jobData } = job.data;

    try {
      const { isNew } = await upsertJob(jobData);

      await incrementStatsService(importLogId, {
        newJob: isNew ? 1 : 0,
        updatedJob: isNew ? 0 : 1,
      });

      return { success: true };
    } catch (error) {
      logger.error("Job processing failed", error.message);

      await incrementStatsService(importLogId, {
        failedJob: 1,
        failure: {
          externalJobId: jobData.externalJobId,
          reason: error.message,
        },
      });

      throw error; // IMPORTANT → allows BullMQ retry
    }
  },
  {
    connection: redisConnection,
    concurrency: Number(serverConfig.workerCurrency) || 5,
  }
);

jobWorker.on("completed", (job) => {
  logger.info(`Job completed: ${job.id}`);
});

jobWorker.on("failed", (job, err) => {
  logger.error(`Job failed: ${job?.id}`, err.message);
});
