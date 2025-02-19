import express from "express";
import { createProject } from "../controllers/projectController";
import upload from "../middlewares/imageUploadingMiddleware";

const projectRouter = express.Router();

projectRouter.route("/").post(upload.single("projectLogo"), createProject);

export default projectRouter;
