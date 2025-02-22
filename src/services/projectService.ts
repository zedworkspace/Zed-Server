import mongoose, { ObjectId } from "mongoose";
import { IProject } from "../interfaces/projectInterface";
import Project from "../models/projectModel";
import CustomError from "../utils/CustomError";

export const createProject = async (newProjectData: {name:string; description: string; logo: string; owner: mongoose.Types.ObjectId;}): Promise<IProject> => {
  
  const project = await Project.create({
    name: newProjectData.name,
    logo: newProjectData.logo,
    description: newProjectData.description,
    owner: newProjectData.owner,
  });
  return project;
};

export const getProjects =async ()=>{
  const projects = await Project.find();
  return projects
}