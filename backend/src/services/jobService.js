import { JOB } from "../schemas/jobsSchema.js";

export const upsertJob = async (jobData) => {
  const result = await JOB.findOneAndUpdate(
    {
      source: jobData.source,
      externalJobId: jobData.externalJobId,
    },
    {
      $set: jobData,
    },
    {
      upsert: true,
      new: false, // allows us to detect insert vs update efficiently.
    }
  );

  /**
   * If result === null → new job
   * If result exists → updated job
   */
  return {
    isNew: !result,
  };
};
