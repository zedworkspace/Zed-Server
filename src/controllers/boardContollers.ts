import catchAsync from "../utils/catchAsync";
import * as boardService from "../services/boardServices";
export const getProjectBoards = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const boards = await boardService.getProjectBoards({ projectId });
  res.status(200).json({
    status: "success",
    message: "Successfully fetched Boards",
    data: boards,
  });
});

export const getBoardById = catchAsync(async (req, res) => {
  const { projectId, boardId } = req.params;
  const board = await boardService.getBoardById({ boardId, projectId });
  res
    .status(200)
    .json({
      status: "success",
      message: "Successfully fetched board",
      data: board,
    });
});

export const createBoard = catchAsync (async (req, res) => {
  const board = await boardService.createBoard(req.body)
  res.status(201).json({status:"success", message:"New board created", data:board})
})
