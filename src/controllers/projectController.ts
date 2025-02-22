import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import * as projectService from '../services/projectService';
import CustomError from "../utils/CustomError";
import { IUser } from "../interfaces/userInterface";
import { IProject } from "../interfaces/projectInterface";
import { ObjectId } from "mongodb";
import mongoose from "mongoose"; // Import Mongoose
import catchAsync from "../utils/catchAsync";

export const createProject = catchAsync(async (req, res) => {
  const owner = req.user as IUser;
  if (!req.file?.path) throw new CustomError("Logo is required", 400);

  const newProjectData = {
    name: req.body.name,
    description: req.body.description,
    logo: req.file.path,
    owner: owner._id,
  };

  const project = await projectService.createProject(newProjectData);
  res.status(200).json({
    status: "success",
    message: "Successfully created project",
    data: project,
  });
});



export const getProjects = asyncErrorHandler(async(req, res) => {
  const projects = await projectService.getProjects();
  res.status(200).json({
    status: "success",
    message: "Successfully getall project",
    data: projects,
  });
});
