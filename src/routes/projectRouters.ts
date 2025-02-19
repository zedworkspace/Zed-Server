import express, { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";
import upload from "../middlewares/imageUploadingMiddleware";

const projectRouter: Router = express.Router();

projectRouter.route("/").post(upload.single("projectLogo"), createProject).get(getProjects)

export default projectRouter;
