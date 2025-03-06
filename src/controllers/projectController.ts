import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import * as projectService from "../services/projectService";
import CustomError from "../utils/CustomError";
import { IUser } from "../interfaces/userInterface";
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
  console.log(project,'projject');
  res.status(200).json({
    status: "success",
    message: "Successfully created project",
    data: project,
  });
});

export const getProjects = catchAsync(async (req, res) => {
  const user = req.user as IUser;
  const projects = await projectService.getProjects(user._id);

  res.status(200).json({
    status: "success",
    message: "Successfully fetched projects",
    data: projects,
  });
});

export const getProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const project = await projectService.getProject(id);  
  res.status(200).json({
    status: "success",
    message: "Successfully fetched project",
    data: project,
  });
});
