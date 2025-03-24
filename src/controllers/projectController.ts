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

export const updateProject = catchAsync(async(req,res) => {
  const {projectId} = req.params
  const logo = req.files["logo"] ? req.files["logo"][0] : null;
  const banner = req.files["banner"] ? req.files["banner"][0] : null;
  
  const project = await projectService.updateProject(projectId,req.body,logo,banner)
  res.status(201).json({message:"Project updated",data:project})
})

export const leaveProject = catchAsync(async (req, res) => {
  const user = req.user as IUser;
  const {projectId} = req.params;
  const response = await projectService.leaveProject(user._id, projectId);

  res.status(200).json({
    status: "success",
    message: response.message,
    isOwner: response.isOwner
  });
});

export const changeOwner = catchAsync(async (req, res) => {
  const owner = req.user as IUser;
  const {projectId, userId} = req.params;
  const response = await projectService.changeOwner(owner._id, projectId, userId);

  res.status(200).json({
    status: "success",
    message: response.message,
    data: response.project
  });
});

export const isOwner = catchAsync(async (req, res) => {
  const owner = req.user as IUser;
  const {projectId} = req.params;
  const response = await projectService.isOwner(owner._id, projectId);

  res.status(200).json({
    status: "success",
    message: response.message,
    isOwner: response.isOwner
  });
});