import { getImportHistoryService } from "../services/importlogService.js";

export const getImportHistoryController = async (req, res, next) => {
  try {
    const imports = await getImportHistoryService();
    res.json(imports);
  } catch (error) {
    console.error("❌ Failed to fetch import history", error);
    next(error);
  }
};
