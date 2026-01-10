import mongoose from "mongoose";

const failureSchema = new mongoose.Schema(
  {
    externalJobId: {
      type: String,
    },

    reason: {
      type: String,
    },
  },
  { id: false }
);

const importLogSchema = new mongoose.Schema(
  {
    sourceFile: {
      type: String,
      required: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    finishedAt: Date,

    totalFetched: {
      type: Number,
      default: 0,
    },

    totalImported: {
      type: Number,
      default: 0,
    },

    newJobs: {
      type: Number,
      default: 0,
    },

    updatedJobs: {
      type: Number,
      default: 0,
    },

    failedJobs: {
      type: Number,
      default: 0,
    },

    failures: [failureSchema],

    status: {
      type: String,
      enum: ["RUNNING", "COMPLETED", "FAILED"],
      default: "RUNNING",
    },
  },
  {
    timestamps: true,
  }
);

export const IMPORTLOG = mongoose.model("IMPORTLOG", importLogSchema);
