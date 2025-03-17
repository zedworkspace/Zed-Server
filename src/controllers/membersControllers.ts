import { Request, Response } from "express";
import Member from "../models/memberModel";
import * as memberServices from "../services/membersServices";

export const joinProject = async (req: Request, res: Response) => {
  const { userId, projectId } = req.body;

  const newMember = await memberServices.joinProject(projectId, userId);

  res
    .status(201)
    .json({ message: "User joined server successfully", member: newMember });
};

export const getMembersByProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const members = await memberServices.getMembersByProject(projectId);
  res
    .status(200)
    .json({
      status: "success",
      message: "successfully fetched",
      data: members,
    });
};
