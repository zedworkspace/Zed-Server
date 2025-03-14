import catchAsync from "../utils/catchAsync";
import * as roleService from "../services/roleServices";
import { IUser } from "../interfaces/userInterface";

export const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  res.status(201).json({ message: "New Role Created", data: role });
});

export const assignRoleToUser = catchAsync(async (req, res) => {
  const member = await roleService.assignRoleToUser(req.body);
  res.status(201).json({ message: "Role assigned to user", data: member });
});

export const removeUserfromRoles = catchAsync(async (req, res) => {
  const member = await roleService.removeUserfromRoles(req.body);
  res.status(201).json({ message: "User removed from this Role", data: member });
});

// export const getRolesByProject = catchAsync(async (req, res) => {
//   const { projectId } = req.params;
//   const roles = await roleService.getRolesByProject(projectId);
//   res
//     .status(200)
//     .json({ message: "Get roles included this project", data: roles });
// });

export const getSingleRole = catchAsync(async (req, res) => {
  const { roleId } = req.params;
  const role = await roleService.getSingleRole(roleId);
  res.status(200).json({ message: "Get the single role", data: role });
});

export const updateRole = catchAsync(async (req,res) => {
  const role = await roleService.updateRole(req.body)
  res.status(201).json({message:"Role updated",data:role})
})

export const getRolesWithMembersByProject = catchAsync(async (req,res) => {
  const { projectId } = req.params;
  const rolesWithMembers = await roleService.getRolesWithMembersByProject(projectId)
  res.status(200).json({message:"Get the roles of each projects",data:rolesWithMembers})
})
