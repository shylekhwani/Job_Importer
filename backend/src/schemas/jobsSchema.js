import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      index: true,
    },

    externalJobId: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
    },

    company: {
      type: String,
    },

    location: {
      type: String,
    },

    description: {
      type: String,
    },

    url: {
      type: String,
    },

    jobType: {
      type: String,
    },

    category: {
      type: String,
    },

    hash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ source: 1, externalJobId: 1 }, { unique: true });

export const JOB = mongoose.model("JOB", jobSchema);
