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

export const getImportHistoryService = async (limit, skip) => {
  try {
    const [imports, total] = await Promise.all([
      IMPORTLOG.find()
        .sort({ createdAt: -1 }) // latest first
        .skip(skip)
        .limit(limit),
      IMPORTLOG.countDocuments(),
    ]);

    return { imports, total };
  } catch (error) {
    console.error("❌ Failed to fetch import history", error);
    throw error;
  }
};
