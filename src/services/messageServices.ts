import { IMessage } from "../interfaces/messageInterface";
import Channel from "../models/channelModel";
import Member from "../models/memberModel";
import Message from "../models/messageModel";
import CustomError from "../utils/CustomError";

// Send a new message
export const sendMessage = async ({channelId, senderId, content, type} : {channelId: string , senderId: string, content: string, type: string} ) => {
 
  const channel = await Channel.findById(channelId);
  if (!channel) {
    throw new CustomError("Channel not found",404) 
  }

  // Check if user is a member of the server
  const isMember = await Member.findOne({ userId: senderId, projectId: channel.projectId });
  if (!isMember) {
    throw new CustomError("User is not member of this project",404)
  }

  const message = new Message({
    channelId ,
    senderId,
    content,
    type,
  });

  return await message.save();
};

// Get messages from a channel
export const getMessagesByChannel = async (channelId:string) => {
  return await Message.find({ channelId }).populate('senderId', '_id name profileImg' );
};
