import { FEEDS } from "../config/feedConfig.js";
import { fetchFeed } from "../services/fetchFeed.js";
import { normalizeJob } from "../services/normalizeJob.js";

export const fetchAllFeeds = async () => {
  const results = [];

  for (const feed of FEEDS) {
    const { source, sourceFile, items } = await fetchFeed(feed);

    const normalizedJobs = items.map((item) => normalizeJob(item, source));

    results.push({
      source,
      sourceFile,
      jobs: normalizedJobs,
      totalFetched: normalizedJobs.length,
    });
  }

  return results;
};
