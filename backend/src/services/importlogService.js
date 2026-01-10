import { IMPORTLOG } from "../schemas/importlogSchema.js";

export const createImportLogService = async (sourceFile) => {
  return IMPORTLOG.create({
    sourceFile,
  });
};

export const markImportCompletedService = async (importLogId) => {
  return IMPORTLOG.findByIdAndUpdate(importLogId, {
    status: "COMPLETED",
    finishedAt: new Date(),
  });
};

export const incrementStatsService = async (
  importLogId,
  { newJob = 0, updatedJob = 0, failedJob = 0, failure }
) => {
  const update = {
    $inc: {
      totalImported: newJob + updatedJob,
      newJobs: newJob,
      updatedJobs: updatedJob,
      failedJobs: failedJob,
    },
  };

  if (failure) {
    update.$push = {
      failures: failure,
    };
  }

  return IMPORTLOG.findByIdAndUpdate(importLogId, update);
};
