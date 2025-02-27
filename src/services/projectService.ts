import mongoose, { ObjectId } from "mongoose";
import { IProject } from "../interfaces/projectInterface";
import Project from "../models/projectModel";
import CustomError from "../utils/CustomError";
import Channel from "../models/channelModel";
import { IChannel } from "../interfaces/channelInterface";
import Member from "../models/memberModel";


export const createProject = async (newProjectData: {
  name: string;
  description: string;
  logo: string;
  owner: mongoose.Types.ObjectId;
}): Promise<{ project: IProject; channel: any }> => {
  const project = await Project.create({
    name: newProjectData.name,
    logo: newProjectData.logo,
    description: newProjectData.description,
    owner: newProjectData.owner,
  });
  // we will create project members first will be owner
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
  const newMember = new Member({ userId:newProjectData.owner, projectId:project._id });
  await newMember.save();

  console.log("newMember", newMember);
  return { project, channel };

};

// export const getProjects = async (userId: mongoose.Types.ObjectId) => {
//   const projects = await Project.find({ owner: { _id: userId } });
//   return projects;
// };

export const getProject = async (projectId: string) => {
  const project = await Project.findOne({ _id: projectId });
  return project;
};

export const getProjects = async (userId: mongoose.Types.ObjectId) =>{
  const projects = await Member.find({userId}).populate('projectId', '_id name logo description owner repo')
  console.log(projects,'alksjfkjaslkdjf');
  return projects

}
