import express from "express";
import { runImportController } from "../controllers/runImportController.js";

const runRouter = express.Router();

runRouter.post("/", runImportController);

export default runRouter;
