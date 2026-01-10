import express from "express";
import cors from "cors";
import { fetchAllFeeds } from "./modules/fetchFeedModule.js";
import { runImport } from "./modules/runImportModule.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date(),
  });
});

// Test Route
app.get("/test/feeds", async (req, res) => {
  const data = await fetchAllFeeds();
  res.json(
    data.map((f) => ({
      sourceFile: f.sourceFile,
      totalFetched: f.totalFetched,
    }))
  );
});

// Test Route
app.post("/import/run", async (req, res) => {
  runImport();
  res.json({ message: "Import started" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server",
    source: "From Custom err handle middlewear",
  });
});

export default app;
