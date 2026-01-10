import { enqueueJobsService } from "../services/enqueueJobsService.js";
import {
  createImportLogService,
  markImportCompletedService,
} from "../services/importlogService.js";
import { fetchAllFeeds } from "./fetchFeedModule.js";

export const runImport = async () => {
  const feeds = await fetchAllFeeds();

  for (const feed of feeds) {
    const importLog = await createImportLogService(feed.sourceFile);

    await enqueueJobsService(importLog._id, feed.jobs);

    await markImportCompletedService(importLog._id);
  }
};
