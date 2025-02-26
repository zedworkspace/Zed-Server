import { Server } from "socket.io";
import { createServer } from "http";
import { config } from "./configs/config";
import app from "./app";
import { connectDB } from "./configs/db";

// Database connection
connectDB();

// Create HTTP Server
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    credentials: true,
  },
});

// Store active users
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log(" A user connected:", socket.id);

  // Handle user joining a room (channel)
  socket.on("joinChannel", ({ channelId, userId }) => {
    socket.join(channelId);
    activeUsers.set(userId, socket.id);
    console.log(`✅ User ${userId} joined channel ${channelId}`);
  });

  // Handle sending messages
  socket.on("sendMessage", async ({ channelId, senderId, message }) => {
    console.log(`📩 Message from ${senderId} in channel ${channelId}: ${message}`);

    // Emit message to everyone in the room
    io.to(channelId).emit("receiveMessage", { senderId, message });

    // Store message in DB (optional)
    // await saveMessageToDB(channelId, senderId, message);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
    activeUsers.delete(socket.id);
  });
});

// Start Server
server.listen(config.SERVER_PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.SERVER_PORT}`);
});
