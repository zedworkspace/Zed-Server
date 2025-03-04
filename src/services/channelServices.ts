import { IChannel } from "../interfaces/channelInterface";
import Channel from "../models/channelModel";

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

export const getChannelByProjectId = async (projectId: string) => {
  const textChannels = await Channel.find({ projectId, type: "text" });
  const voiceChannels = await Channel.find({ projectId, type: "voice" });
  return { textChannels, voiceChannels };
};
