import express from "express";
import { runModel } from "../controllers/modelController.js";

const modelRouter = express.Router();

// Run model
modelRouter.post("/run", runModel);

export default modelRouter;
