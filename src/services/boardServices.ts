import Board from "../models/boardModel";

export const getProjectBoards = async ({
  projectId,
}: {
  projectId: string;
}) => {
  const boards = await Board.find({ projectId });
  return boards;
};
