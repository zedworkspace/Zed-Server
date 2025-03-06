import mongoose from "mongoose";
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

export const sendFile = async (messageData :{
  file:string,
  channelId:string,
  senderId:mongoose.Types.ObjectId,
})=>{

  const channel = await Channel.findById(messageData.channelId);
  if (!channel) {
    throw new CustomError("Channel not found",404) 
  }

  const isMember = await Member.findOne({ userId: messageData.senderId, projectId: channel.projectId });
  if (!isMember) {
    throw new CustomError("User is not member of this project",404)
  }

  return messageData.file
}


// Get messages from a channel
export const getMessagesByChannel = async (channelId:string) => {
  return await Message.find({ channelId }).populate('senderId', '_id name profileImg' );
};


export const unReadMessages = async (userId:mongoose.Types.ObjectId) => {
  const messages = await Message.aggregate([
    {$match: {readBy:{$ne:userId}}},
    {$group: { _id:"$channelId", count: {$sum:1}}}
  ])

  return messages
}


export const readMessage = async (userId:mongoose.Types.ObjectId, channelId:string) => {

  const message = await Message.updateMany(
    { channelId, readBy: { $ne: userId } }, 
      { $addToSet: { readBy: userId } } 
  )
  return message
}
