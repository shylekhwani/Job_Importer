import { IMPORTLOG } from "../schemas/importlogSchema.js";

export const createImportLogService = async (sourceFile, totalFetched) => {
  return IMPORTLOG.create({
    sourceFile,
    totalFetched,
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

export const getImportHistoryService = async () => {
  try {
    const imports = await IMPORTLOG.find().sort({ createdAt: -1 }).limit(50); // safe

    return imports;
  } catch (error) {
    console.error("❌ Failed to fetch import history", error);
    throw error;
  }
};
