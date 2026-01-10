import { Queue } from "bullmq";
import { redisConnection } from "../config/redisConfig.js";

export const JOB_QUEUE_NAME = "job-import-queue";

export const jobQueue = new Queue(JOB_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
