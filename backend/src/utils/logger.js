export const logger = {
  info: (...args) => console.log("ℹ️", ...args),
  error: (...args) => console.error("❌", ...args),
  warn: (...args) => console.warn("⚠️", ...args),
};
