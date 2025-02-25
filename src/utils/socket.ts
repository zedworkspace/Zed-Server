import { DefaultEventsMap, Server } from "socket.io";
import Message from "../models/messageModel";

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
    socket.on("sendMessage", async ({ channelId, senderId, content, type }) => {
      try {
        const message = new Message({ channelId, senderId, content, type });
        await message.save();

        // Broadcast message to users in the same room
        io.to(channelId).emit("receiveMessage", message);
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
