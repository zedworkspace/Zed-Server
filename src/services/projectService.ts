import { ProjectCreateBody } from "../interfaces/projectInterface";
import Project from "../models/projectModel";

export const create = async (
  body: ProjectCreateBody,
  productImage: Express.Multer.File | undefined
) => {
  if (!productImage) throw new Error("Something happened with image.");
  
  const project = await Project.create({
    projectName: body.projectName,
    projectLogo: productImage.path,
    ProjectDescription: body.ProjectDescription,
  });
  return project;
};

export const getAll =async ()=>{
  const projects = await Project.find();
  return projects
}