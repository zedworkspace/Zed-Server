import express, { Router } from "express";
import {
  createProject,
  getProject,
  getProjects,
  updateProject,
  leaveProject,
  changeOwner,
  isOwner,
} from "../controllers/projectController";
import upload from "../middlewares/imageUploadingMiddleware";
import { userAuth } from "../middlewares/userAuth";

const projectRouter: Router = express.Router();


projectRouter.route("/").post(userAuth, upload.single("logo"), createProject);

projectRouter
  .route("/")
  .post(userAuth, upload.single("logo"), createProject)
  .get(userAuth, getProjects);

projectRouter.route("/:id").get(userAuth, getProject);
projectRouter.put('/update/:projectId',upload.single('logo'),updateProject)
projectRouter.route("/:projectId").post(userAuth, leaveProject);
projectRouter.route("/change-owner/:projectId/:userId").post(userAuth, changeOwner);
projectRouter.route("/check-ownership/:projectId/").get(userAuth, isOwner);

export default projectRouter;

