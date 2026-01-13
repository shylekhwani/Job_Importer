import { runImport } from "../modules/runImportModule.js";

export const runImportController = async (req, res, next) => {
  try {
    runImport();

    res.status(202).json({
      message: "Import started successfully",
    });
  } catch (error) {
    next(error);
  }
};
