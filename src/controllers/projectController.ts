import { create, getAll } from "../services/projectService";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";

export const createProject = asyncErrorHandler(async (req, res) => {
  const { body } = req;
  const productImage = req.file;
  const project = await create(body, productImage);
  res.status(200).json({
    status: "success",
    message: "Successfully created project",
    data: project,
  });
});

export const getProjects = asyncErrorHandler(async(req, res) => {
  const projects = await getAll();
  res.status(200).json({
    status: "success",
    message: "Successfully getall project",
    data: projects,
  });
});
