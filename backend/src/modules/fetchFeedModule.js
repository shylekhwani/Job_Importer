import { FEEDS } from "../config/feedConfig.js";
import { fetchFeedService } from "../services/fetchFeedService.js";
import { normalizeJob } from "../services/normalizeJobService.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchAllFeeds = async () => {
  const results = [];

  for (const feed of FEEDS) {
    const { source, sourceFile, items } = await fetchFeedService(feed);

    const normalizedJobs = items.map((item) => normalizeJob(item, source));

    results.push({
      source,
      sourceFile,
      jobs: normalizedJobs,
      totalFetched: normalizedJobs.length,
    });

    // small delay to avoid rate-limiting
    await delay(1000);
  }

  return results;
};
