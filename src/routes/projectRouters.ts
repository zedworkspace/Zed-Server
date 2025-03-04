import express, { Router } from "express";
import {
  createProject,
  getProject,
  getProjects,
} from "../controllers/projectController";
import upload from "../middlewares/imageUploadingMiddleware";
import { userAuth } from "../middlewares/userAuth";
import { acceptInvite, generateInviteLink, getInviteInfo, sendInviteEmail } from "../controllers/inviteControllers";

const projectRouter: Router = express.Router();


projectRouter.route("/").post(userAuth, upload.single("logo"), createProject);

projectRouter
  .route("/")
  .post(userAuth, upload.single("logo"), createProject)
  .get(userAuth, getProjects);

projectRouter.route("/:id").get(userAuth, getProject);

export default projectRouter;

