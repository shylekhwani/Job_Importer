import axios from "axios";
import { parseXML } from "../utils/xmlParse.js";
import { logger } from "../utils/logger.js";

const sanitizeXML = (xml) => {
  return xml
    .replace(/&(?!(amp;|lt;|gt;|quot;|apos;))/g, "&amp;")
    .replace(/<br>/g, "<br/>");
};

export const fetchFeedService = async ({ source, url }) => {
  try {
    logger.info(`Fetching feed: ${url}`);

    const response = await axios.get(url, {
      timeout: 25000,
      headers: {
        "User-Agent": "JobImporterBot/1.0 (MERN Assignment)",
        Accept: "application/xml",
      },
    });

    const rawXML = response.data;
    const cleanXML = sanitizeXML(rawXML);
    const parsed = await parseXML(cleanXML);

    // console.log("Parsed XML:", parsed);

    /**
     * Different feeds have different structures
     * Normalize them here
     */
    let items = [];

    // Jobicy feeds  // 👉 this code is REPLACING the items array.
    if (parsed?.rss?.channel?.item) {
      items = Array.isArray(parsed.rss.channel.item)
        ? parsed.rss.channel.item // “Point items to this array”
        : [parsed.rss.channel.item]; // “Create a NEW array with this object inside”
    }

    // HigherEdJobs RSS
    if (parsed?.channel?.item) {
      items = Array.isArray(parsed.channel.item)
        ? parsed.channel.item
        : [parsed.channel.item];
    }

    logger.info(`Fetched ${items.length} jobs from ${url}`);
    // console.log("Jobs", items);

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
