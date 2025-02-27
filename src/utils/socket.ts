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

    // Join Room
    socket.on("joinRoom", (channelId) => {
      socket.join(channelId);
      console.log(`User joined room: ${channelId}`);
    });

    // Handle New Message
    socket.on("sendMessage", async (data) => {
      try {
          const { channelId, senderId, content, type } = data;

          console.log(data,'dataaaaaaaaaaaaaaaaaaaaaaaaaaa');
  
          // ✅ Fetch the sender's profile image
          const sender = await User.findById(senderId).select("_id name profileImg");

          console.log(sender,'senderrrrrrrrrrrr');
  
          if (!sender) return;
  
          // ✅ Create a new message
          const newMessage = new Message({
              senderId: sender._id,
              content,
              type,
              channelId,
          });

          console.log(newMessage,'new message....');
  
          await newMessage.save();
  
          // ✅ Emit the message with sender details
          io.to(channelId).emit("receiveMessage", {
              _id: newMessage._id,
              senderId: {
                  name:sender.name,
                  _id: sender._id,
                  profileImg: sender.profileImg ,
              },
              content,
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
