import mongoose from "mongoose";
import Board from "../models/boardModel";
import Member from "../models/memberModel";
import CustomError from "../utils/CustomError";

export const getProjectBoards = async ({
  projectId,
  userId,
}: {
  projectId: string;
  userId: mongoose.Types.ObjectId;
}) => {
  const member = await Member.findOne({
    userId,
    projectId,
    status: "active",
  });
  if (!member) {
    return [];
  }
  const memberRoles = member.roles.map((role) => role.toString());
  const boards = await Board.aggregate([
    {
      $match: {
        projectId: new mongoose.Types.ObjectId(projectId),
        $or: [
          { allowedRoles: { $size: 0 } },
          { allowedRoles: { $in: memberRoles } },
        ],
      },
    },
  ]);

  return boards;
};

export const getBoardById = async ({
  projectId,
  boardId,
}: {
  projectId: string;
  boardId: string;
}) => {
  const board = await Board.findOne({ projectId, _id: boardId });

  if (!board)
    throw new CustomError(`Can't find board with this id ${boardId}`, 400);
  return board;
};

export const createBoard = async ({
  name,
  projectId,
  allowedRoles,
}: {
  name: string;
  projectId: string;
  allowedRoles?: string[];
}) => {
  const board = await Board.create({
    projectId: projectId,
    name: name,
    allowedRoles,
  });
  return board;
};

export const getMembersByRoles = async (boardId: string) => {
  const board = await Board.findOne({ _id: boardId });

  if (!board)
    throw new CustomError(`Can't find board with this id ${boardId}`, 400);

  const matchStage = board.allowedRoles.length
    ? {
        projectId: board.projectId,
        roles: {
          $in: board.allowedRoles.map(
            (role) => new mongoose.Types.ObjectId(role)
          ),
        },
      }
    : {
        projectId: board.projectId,
      };

  const allowedMembers = await Member.aggregate([
    {
      $match: matchStage,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        "user.name": 1,
        "user.profileImg": 1,
        "user._id": 1,
        roles: 1,
        status: 1,
      },
    },
  ]);
  return allowedMembers.map((user) => user.user);
};
