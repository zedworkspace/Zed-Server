import mongoose, { ObjectId } from "mongoose";
import { IProject } from "../interfaces/projectInterface";
import Project from "../models/projectModel";
import CustomError from "../utils/CustomError";
import Channel from "../models/channelModel";

export const createProject = async (newProjectData: {name:string; description: string; logo: string; owner: mongoose.Types.ObjectId;}): Promise<{ project: IProject; channel: any }> => {
  
  const project = await Project.create({
    name: newProjectData.name,
    logo: newProjectData.logo,
    description: newProjectData.description,
    owner: newProjectData.owner,
  });
  const channel = await Channel.create({
    name : 'Gneral Text',
    projectId:project._id,
    type : 'text',
  },
  {
    name : 'Gneral Voice',
    projectId:project._id,
    type : 'voice',
  })
  return {project,channel}
};

export const getProjects =async ()=>{
  const projects = await Project.find();
  return projects
}