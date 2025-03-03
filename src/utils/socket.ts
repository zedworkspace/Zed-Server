import { DefaultEventsMap, Server } from "socket.io";
import Message from "../models/messageModel";
import User from "../models/userModel";

let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export const initializeSocket = (server:any) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (channelId) => {
      socket.join(channelId);
      console.log(`User joined room: ${channelId}`);
    });

    socket.on("sendMessage", async (data) => {
      try {
          const { channelId, fileUrl, senderId, content, type } = data;  

          console.log(data,'dataaaaaaaaaaaaaaaaaaaaaaa');
          const sender = await User.findById(senderId).select("_id name profileImg");

  
          if (!sender) return;
  
          const newMessage = new Message({
              senderId: sender._id,
              content,
              fileUrl,
              type,
              channelId,
          });

          
          await newMessage.save();
  
          io.to(channelId).emit("receiveMessage", {
              _id: newMessage._id,
              senderId: {
                  name:sender.name,
                  _id: sender._id,
                  profileImg: sender.profileImg ,
              },
              content,
              fileUrl,
              type,
              channelId,
          });
      } catch (error) {
          console.error("Error sending message:", error);
      }
  });
  

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;
