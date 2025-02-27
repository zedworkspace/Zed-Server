import Member from "../models/memberModel";
import Project from "../models/projectModel";
import CustomError from "../utils/CustomError";

export const joinProject = async(projectId:string,userId:string) => {
    const project = await Project.findById(projectId);
    if (!project) {
       throw new CustomError("Server not found", 400) 
    }
  
    // Check if user is already in the server
    const existingMember = await Member.findOne({ userId, projectId });
    if (existingMember) {
       throw new CustomError("User is already in this project", 400) 
    }
  
    // Add user to members collection
    const newMember = new Member({ userId, projectId });
    await newMember.save();

    return newMember
}

export const getMembersByProject = async (projectId:string) => {
    const members = await Member.find({ projectId }).populate("userId", "name profileImg");
    
    if (!members.length) {
      throw new CustomError("No members found", 404)
    }
    return members
}