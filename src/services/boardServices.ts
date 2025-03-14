import Board from "../models/boardModel";
import CustomError from "../utils/CustomError";

export const getProjectBoards = async ({
  projectId,
}: {
  projectId: string;
}) => {
  const boards = await Board.find({ projectId });
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

export const createBoard = async ({name,projectId}:{name:string,projectId:string}) => {
  const board = await Board.create({
    projectId:projectId,
    name:name
  })
  return board
}
