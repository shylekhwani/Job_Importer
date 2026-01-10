import crypto from "crypto";

export const normalizeJob = (rawJob, source) => {
  const externalJobId =
    rawJob.guid?._ || rawJob.guid || rawJob.id || rawJob.link;

  const normalized = {
    source,
    externalJobId: String(externalJobId),

    title: rawJob.title,
    company: rawJob["job:company"] || rawJob.author || "Unknown",
    location: rawJob["job:location"] || rawJob.location || "Remote",
    description: rawJob.description,
    url: rawJob.link,

    jobType: rawJob["job:type"] || "",
    category: rawJob.category || "",
  };

  // Hash important fields to detect changes
  const hash = crypto
    .createHash("sha256")
    .update(
      `${normalized.title}|${normalized.company}|${normalized.location}|${normalized.description}`
    )
    .digest("hex");

  return {
    ...normalized,
    hash,
  };
};

/*
    External feeds are dirty & inconsistent.
    We normalize into OUR internal format.
 */
