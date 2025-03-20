import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as channelServices from "../services/channelServices";
import CustomError from "../utils/CustomError";
import { IUser } from "../interfaces/userInterface";

export const createChannel = catchAsync(async (req: Request, res: Response) => {
  const newChannel = await channelServices.createChannel(req.body);
  res.status(201).json({
    status: "success",
    message: "Channel created",
    data: newChannel,
  });
});

export const getChannelByProjectId = catchAsync(
  async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const user = req.user as IUser;
    if (!user) throw new CustomError("user not found", 404);
    const channel = await channelServices.getChannelByProjectId(
      projectId,
      user._id
    );
    res.status(201).json({
      status: "success",
      message: "get channels by specific project",
      data: channel,
    });
  }
);

export const getChannelById = catchAsync(async (req, res) => {
  const { projectId, channelId } = req.params;
  const channel = await channelServices.getChannelById(channelId, projectId);
  if (!channel) throw new CustomError("Channel not found", 400);
  res.status(200).json({
    status: "success",
    message: "Successfully fetched channel",
    data: channel,
  });
});
