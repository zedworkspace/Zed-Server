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

  const colors = ["#f87171", "#60a5fa", "#4ade80",  "#facc15", "#c084fc", "#fb7185"];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const list = await List.create({
    boardId,
    name: body.name,
    position,
    color: randomColor,
  });

  return list;
};

export const getListsByBoardId = async ({ boardId }: { boardId: string }) => {
  if (!boardId) throw new CustomError("Board id is missing!", 400);

  const boardObjId = new mongoose.Types.ObjectId(boardId);
  const lists = await List.aggregate([
    { $match: { boardId: boardObjId, isDeleted: false } },
    { $sort: { position: 1 } },
    {
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "listId",
        pipeline: [
          { $match: { isDeleted: false } },
          { $sort: { position: 1 } },
        ],
        as: "cards",
      },
    },
    // {
    //   $addFields: {
    //     cards: { $sortArray: { input: "$cards", sortBy: { position: 1 } } },
    //   },
    // },
  ]);
  console.log("lists", lists);
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

  const activeListPosition = activeList?.position as number;
  const overListPosition = overList?.position as number;
  const positionDiff = Math.abs(activeListPosition - overListPosition);

  if (positionDiff === 1) {
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
  } else if (activeListPosition < overListPosition) {
    await List.updateMany(
      {
        boardId: new mongoose.Types.ObjectId(body.boardId),
        position: { $gt: activeListPosition, $lte: overListPosition },
      },
      { $inc: { position: -1 } }
    );
    await List.findOneAndUpdate(
      { _id: body.activeListId },
      { position: overListPosition }
    );
  } else if (activeListPosition > overListPosition) {
    await List.updateMany(
      {
        boardId: new mongoose.Types.ObjectId(body.boardId),
        position: { $gte: overListPosition, $lt: activeListPosition },
      },
      { $inc: { position: 1 } }
    );

    await List.findOneAndUpdate(
      { _id: body.activeListId },
      { position: overListPosition }
    );
  } else throw new CustomError("something wrong happened", 400);

  return await List.find({ boardId: body.boardId });
};

export const softDeleteById = async (_id: string) => {
  await List.findOneAndUpdate({ _id }, { isDeleted: true });
};
