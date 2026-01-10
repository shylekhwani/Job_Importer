import { jobQueue } from "../queues/jobQueue.js";

export const enqueueJobsService = async (importLogId, jobs) => {
  const bulk = jobs.map((job) => ({
    name: "import-job",
    data: {
      importLogId,
      jobData: job,
    },
  }));

  await jobQueue.addBulk(bulk);
};
