import mongoose, { ObjectId } from "mongoose";
import { IProject } from "../interfaces/projectInterface";
import Project from "../models/projectModel";
import CustomError from "../utils/CustomError";
import Channel from "../models/channelModel";
import { IChannel } from "../interfaces/channelInterface";
import Member from "../models/memberModel";
import Board from "../models/boardModel";
import { IBoard } from "../interfaces/boardInterface";

export const createProject = async (newProjectData: {
  name: string;
  description: string;
  logo: string;
  owner: mongoose.Types.ObjectId;
}): Promise<{ project: IProject; channel: IChannel[]; board: IBoard }> => {
  const project = await Project.create({
    name: newProjectData.name,
    logo: newProjectData.logo,
    description: newProjectData.description,
    owner: newProjectData.owner,
  });

  const channel = await Channel.create(
    {
      name: "General Text",
      projectId: project._id,
      type: "text",
      isDefault: true,
    },
    {
      name: "General Voice",
      projectId: project._id,
      type: "voice",
      isDefault: true,
      // channelMembers:[newProjectData.owner]
    }
  );

  const board = await Board.create({
    projectId: project._id,
    name: "General Board",
    isDefault: true,
  });

  const newMember = new Member({
    userId: newProjectData.owner,
    projectId: project._id,
  });
  await newMember.save();

  return { project, channel, board };
};

export const getProject = async (projectId: string) => {
  const project = await Project.findOne({ _id: projectId });
  return project;
};

export const getProjects = async (userId: mongoose.Types.ObjectId) => {
  const projects = await Member.find({ userId }).populate(
    "projectId",
    "_id name logo description owner repo"
  );
  return projects;
};
