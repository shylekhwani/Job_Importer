import express from "express";
import { getImportHistoryController } from "../controllers/importlogController.js";

const logRouter = express.Router();

logRouter.get("/", getImportHistoryController);

export default logRouter;
