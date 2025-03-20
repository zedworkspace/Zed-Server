import mongoose from "mongoose";
import { IChannel } from "../interfaces/channelInterface";
import Channel from "../models/channelModel";
import CustomError from "../utils/CustomError";
import Member from "../models/memberModel";

export const createChannel = async (channelData: IChannel) => {
  const { name, type, allowedRoles, description, projectId } = channelData;
  const newChannel = await Channel.create({
    name,
    projectId,
    type,
    description,
    allowedRoles,
  });
  return newChannel;
};

export const getChannelByProjectId = async (
  projectId: string,
  userId: mongoose.Types.ObjectId
) => {
  const member = await Member.findOne({
    userId,
    projectId,
    status: "active",
  });

  if (!member) {
    return { textChannels: [], voiceChannels: [] };
  }

  const memberRoles = member.roles;

  const textChannels = await Channel.aggregate([
    {
      $match: {
        projectId: new mongoose.Types.ObjectId(projectId),
        type: "text",
        $or: [
          { allowedRoles: { $size: 0 } },
          { allowedRoles: { $in: memberRoles } },
        ],
      },
    },
  ]);

  const voiceChannels = await Channel.aggregate([
    {
      $match: {
        projectId: new mongoose.Types.ObjectId(projectId),
        type: "voice",
        $or: [
          { allowedRoles: { $size: 0 } },
          { allowedRoles: { $in: memberRoles } },
        ],
      },
    },
  ]);

  return { textChannels, voiceChannels };
};

export const getChannelById = async (channelId: string, projectId: string) => {
  if (!channelId || !projectId)
    throw new CustomError("Can't find project or channelId", 400);

  return await Channel.findOne({ _id: channelId, projectId });
};
