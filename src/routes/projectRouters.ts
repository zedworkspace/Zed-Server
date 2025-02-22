import express, { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";
import upload from "../middlewares/imageUploadingMiddleware";
import { userAuth } from "../middlewares/userAuth";

const projectRouter: Router = express.Router();

projectRouter.route("/").post(userAuth,upload.single("logo"), createProject);

export default projectRouter;
