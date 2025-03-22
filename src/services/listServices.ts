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

  const lastList = await List.findOne({ boardId }).sort("-position");

  const position = lastList ? lastList?.position + 1 : 1;

  const list = await List.create({
    boardId,
    name: body.name,
    position,
  });

  return list;
};

export const getListsByBoardId = async ({ boardId }: { boardId: string }) => {
  if (!boardId) throw new CustomError("Board id is missing!", 400);

  const boardObjId = new mongoose.Types.ObjectId(boardId);
  const lists = await List.aggregate([
    { $match: { boardId: boardObjId } },
    { $sort: { position: 1 } },
    {
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "listId",
        as: "cards",
      },
    },
    {
      $addFields: {
        cards: { $sortArray: { input: "$cards", sortBy: { position: 1 } } },
      },
    },
  ]);

  return lists;
};

type UpdateListPosition = {
  activeListId: string;
  overListId: string;
  boardId: string;
};

export const updateListPositions = async (body: UpdateListPosition) => {
  const activeList = await List.findOne({
    boardId: body.boardId,
    _id: body.activeListId,
  });
  const overList = await List.findOne({
    boardId: body.boardId,
    _id: body.overListId,
  });
  const activeListPosition = activeList?.position;
  const overListPosition = overList?.position;
  await List.findOneAndUpdate(
    {
      boardId: body.boardId,
      _id: body.activeListId,
    },
    { position: overListPosition }
  );
  await List.findOneAndUpdate(
    {
      boardId: body.boardId,
      _id: body.overListId,
    },
    { position: activeListPosition }
  );
  return await List.find({ boardId: body.boardId });
};
