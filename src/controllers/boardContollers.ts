import catchAsync from "../utils/catchAsync";
import * as boardService from "../services/boardServices";
import CustomError from "../utils/CustomError";
import { IUser } from "../interfaces/userInterface";

export const getProjectBoards = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const user = req.user as IUser;
  console.log("user",user)
  if (!user) throw new CustomError("user not found", 404);
  const boards = await boardService.getProjectBoards({
    projectId,
    userId: user._id,
  });
  res.status(200).json({
    status: "success",
    message: "Successfully fetched Boards",
    data: boards,
  });
});

export const getBoardById = catchAsync(async (req, res) => {
  const { projectId, boardId } = req.params;
  const board = await boardService.getBoardById({ boardId, projectId });
  res.status(200).json({
    status: "success",
    message: "Successfully fetched board",
    data: board,
  });
});

export const createBoard = catchAsync(async (req, res) => {
  const board = await boardService.createBoard(req.body);
  res
    .status(201)
    .json({ status: "success", message: "New board created", data: board });
});

export const getMembersByRoles = catchAsync(async (req, res) => {
  const { boardId } = req.params;
  const members = await boardService.getMembersByRoles(boardId);
  res.status(200).json({
    status: "success",
    message: "Successfully fetched members",
    data: members,
  });
});
