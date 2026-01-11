import { getImportHistoryService } from "../services/importlogService.js";

export const getImportHistoryController = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { imports, total } = await getImportHistoryService(limit, skip);

    res.json({
      data: imports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Failed to fetch import history", error);
    next(error);
  }
};
