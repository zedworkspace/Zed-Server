import mongoose, { Mongoose } from "mongoose";
import Member from "../models/memberModel";
import Role from "../models/roleModel";
import CustomError from "../utils/CustomError";
import { IUser } from "../interfaces/userInterface";
import { IMember } from "../interfaces/memberInterface";

//createRole
export const createRole = async (data: {
  name: string;
  permissions: string[];
  projectId: string;
}) => {
  const roleName = await Role.findOne({ name: data.name });
  if (roleName) throw new CustomError("Role already exist", 404);
  const role = await Role.create({
    name: data.name,
    permissions: data.permissions,
    projectId: data.projectId,
  });

  return role;
};

//assignRoleToUser
export const assignRoleToUser = async (data: {
  projectId: string;
  roleId: mongoose.Types.ObjectId;
  userId: string;
}) => {
  const member = await Member.findOne({
    projectId: data.projectId,
    userId: data.userId,
  });
  if (member?.roles.includes(data.roleId)) {
    throw new CustomError("User already has this role in the project", 400);
  }

  member?.roles.push(data.roleId);
  await member?.save();

  return member;
};

//removeUserfromRoles
export const removeUserfromRoles = async (data: {
  projectId: string;
  roleId: mongoose.Types.ObjectId;
  userId: string;
}) => {
  const member = await Member.findOne({
    projectId: data.projectId,
    userId: data.userId,
  });

  if (!member?.roles?.includes(data.roleId)) {
    throw new CustomError("user not part of this role", 400);
  }

  member.roles = member?.roles?.filter(
    (role) => role.toString() !== data?.roleId.toString()
  );
  await member.save();

  return member;
};

//getRolesByProject
// export const getRolesByProject = async (projectId: string) => {
//   const roles = await Role.find({ projectId });
//   return roles;
// };

//getSingleRole
export const getSingleRole = async (roleId: string) => {
  const role = await Role.findById(roleId);
  return role;
};

//updateRoles
export const updateRole = async (data: {
  roleId: string;
  permissions: string[];
  name: string;
}) => {
  const role = await Role.findByIdAndUpdate(data.roleId, {
    name: data.name,
    permissions: data.permissions,
  });
  return role;
};

//getRolesWithMembersByProject

export const getRolesWithMembersByProject = async (projectId: string) => {
  const role = await Role.find({ projectId })

  const members = await Member.find({ projectId })
  .populate({
    path: "userId",
    select: "name profileImg", 
  })as unknown as IMember[];

  const rolesWithMembers = role.map((role) => {
    const membersInRole = members.filter((member) =>
      member.roles.includes(role._id)
    );

    return {
      roleId: role._id,
      roleName: role.name,
      permissions: role.permissions,
      members: membersInRole.map((member) => ({
        userId: member.userId._id,
        name: member.userId.name,
        profileImg: member.userId.profileImg,
      })),
    };
  });
  return rolesWithMembers;
};
