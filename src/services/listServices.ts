import List from "../models/listModel";
import CustomError from "../utils/CustomError";

export const createListByBoardId = async ({
  boardId,
  body,
}: {
  boardId: string;
  body: { name: string };
}) => {
  if (!boardId) throw new CustomError("Board id is missing!", 400);
  const list = await List.create({
    boardId,
    name: body.name,
  });
  return list;
};
