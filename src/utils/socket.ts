import { DefaultEventsMap, Server } from "socket.io";
import Message from "../models/messageModel";
import User from "../models/userModel";
import List from "../models/listModel";
import Card from "../models/cardModel";
import {
  createListByBoardId,
  getListsByBoardId,
} from "../services/listServices";
import { createCardByListId } from "../services/cardServices";

let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (channelId, userId) => {
      socket.join(channelId);
      console.log(`User joined room: ${channelId}, ${userId}`);
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { channelId, fileUrl, senderId, content, type } = data;

        const sender = await User.findById(senderId).select(
          "_id name profileImg"
        );

        if (!sender) return;

        const newMessage = new Message({
          senderId: sender._id,
          content,
          fileUrl,
          type,
          channelId,
          readBy: [sender._id],
        });

        await newMessage.save();

        io.to(channelId).emit("receiveMessage", {
          _id: newMessage._id,
          senderId: {
            name: sender.name,
            _id: sender._id,
            profileImg: sender.profileImg,
          },
          content,
          fileUrl,
          type,
          channelId,
          readBy: newMessage.readBy,
        });

        io.to(channelId).emit("newUnreadMessage", {
          channelId,
          count: 1,
          senderId: sender._id,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("readMessage", async ({ channelId, userId }) => {
      try {
        const updatedMessages = await Message.updateMany(
          { channelId, readBy: { $ne: userId } },
          { $addToSet: { readBy: userId } }
        );

        if (updatedMessages.modifiedCount > 0) {
          io.to(channelId).emit("messagesRead", { channelId, userId });
        }
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    });

    const handleUpdatedBoard = async ({
      io,
      boardId,
    }: {
      io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
      boardId: string;
    }) => {
      const lists = await getListsByBoardId({ boardId });
      io.emit("onUpdateList", lists);
    };

    socket.on("onCreateCard", async ({ data, listId, boardId }) => {
      await createCardByListId({ body: data, listId });
      handleUpdatedBoard({ io, boardId });
    });

    socket.on("onCreateList", async ({ data, boardId }) => {
      await createListByBoardId({ body: data, boardId });
      handleUpdatedBoard({ io, boardId });
    });

    socket.on("onCardDrop", async (fromListId, cardId, toListId, boardId) => {
      await Card.findOneAndUpdate(
        { _id: cardId },
        { $set: { listId: toListId } }
      );
      handleUpdatedBoard({ io, boardId });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;
