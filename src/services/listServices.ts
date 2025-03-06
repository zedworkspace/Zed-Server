import mongoose from "mongoose";
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

export const getListsByBoardId = async ({ boardId }: { boardId: string }) => {
  if (!boardId) throw new CustomError("Board id is missing!", 400);

  const boardObjId = new mongoose.Types.ObjectId(boardId);
  const lists = await List.aggregate([
    { $match: { boardId: boardObjId } },
    {
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "listId",
        as: "cards",
      },
    },
  ]);

  return lists;
};
