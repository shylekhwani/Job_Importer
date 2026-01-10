import axios from "axios";
import { parseXML } from "../utils/xmlParse.js";
import { logger } from "../utils/logger.js";

const sanitizeXML = (xml) => {
  return xml
    .replace(/&(?!(amp;|lt;|gt;|quot;|apos;))/g, "&amp;")
    .replace(/<br>/g, "<br/>");
};

export const fetchFeed = async ({ source, url }) => {
  try {
    logger.info(`Fetching feed: ${url}`);

    const response = await axios.get(url, {
      timeout: 15000,
    });

    const rawXML = response.data;
    const cleanXML = sanitizeXML(rawXML);
    const parsed = await parseXML(cleanXML);

    /**
     * Different feeds have different structures
     * Normalize them here
     */
    let items = [];

    // Jobicy feeds
    if (parsed?.rss?.channel?.item) {
      items = Array.isArray(parsed.rss.channel.item)
        ? parsed.rss.channel.item
        : [parsed.rss.channel.item];
    }

    // HigherEdJobs RSS
    if (parsed?.channel?.item) {
      items = Array.isArray(parsed.channel.item)
        ? parsed.channel.item
        : [parsed.channel.item];
    }

    logger.info(`Fetched ${items.length} jobs from ${url}`);

    return {
      source,
      sourceFile: url,
      items,
    };
  } catch (error) {
    logger.error(`Feed fetch failed: ${url}`, error.message);
    return {
      source,
      sourceFile: url,
      items: [],
      error: error.message,
    };
  }
};
