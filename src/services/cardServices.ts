import {
  ICard,
  ICreateCard,
  IUpdateCardPositionInDiffListsBody,
  IUpdateCardPositionInDnd,
  IUpdateCardPositionInSameListBody,
} from "../interfaces/cardInterface";
import Card from "../models/cardModel";
import List from "../models/listModel";
import CustomError from "../utils/CustomError";

export const createCardByListId = async ({ listId, body }: ICreateCard) => {
  const lastCard = await Card.findOne({ listId }).sort("-position");

  const currentList = await List.findOne({ _id: listId });
  if (!currentList)
    throw new CustomError(`Can't find list with this id ${listId}`, 400);
  const position = lastCard ? lastCard?.position + 1 : 1;

  const card = await Card.create({
    listId,
    title: body.title,
    position,
    status: currentList?.name,
  });

  return card;
};

export const getCardById = async ({ cardId }: { cardId: string }) => {
  if (!cardId) throw new CustomError("Card id is missing!", 400);
  const card = await Card.findById(cardId);
  if (!card)
    throw new CustomError(`Can't find card with this id ${cardId}`, 400);

  return card;
};

export const editCardById = async (cardId: string, updatedData: ICard) => {
  const { status, listId, title, assignees, description, dueDate, labels } =
    updatedData;
  const currentCard = await Card.findOne({ _id: cardId });
  if (currentCard?.status !== status) {
    await Card.updateMany(
      { status: currentCard?.status, position: { $gt: currentCard?.position } },
      { $inc: { position: -1 } }
    );
    const lastCard = await Card.findOne({ status }).sort("-position");

    const newPosition = lastCard?.position ? lastCard?.position + 1 : 1;
    return await Card.findOneAndUpdate(
      { _id: currentCard?._id },
      {
        listId,
        status,
        position: newPosition,
        title,
        description,
        dueDate,
        labels,
        assignees,
      },
      { new: true }
    );
  } else {
    return await Card.findByIdAndUpdate(
      cardId,
      { title, description, dueDate, labels, assignees },
      { new: true }
    );
  }

  return currentCard;
};

export const updateCardPositionInDnd = async (
  body: IUpdateCardPositionInDnd
) => {
  const { boardId, cardId, fromListId, toListId } = body;
  const lastCard = await Card.findOne({ listId: toListId }).sort("-position");
  const newPosition = lastCard?.position ? lastCard?.position + 1 : 1;

  const activeCard = await Card.findOne({ _id: cardId });
  const activeCardPosition = activeCard?.position;

  // update rest of the cards position
  await Card.updateMany(
    { listId: fromListId, position: { $gte: activeCardPosition } },
    { $inc: { position: -1 } }
  );
  await Card.findOneAndUpdate(
    { _id: cardId },
    { $set: { listId: toListId, position: newPosition } }
  );
  return List.findOne({ _id: toListId });
};

export const updateCardPositionInSameList = async (
  body: IUpdateCardPositionInSameListBody
) => {
  const { fromCardId, listId, toCardId } = body;
  const activeCard = await Card.findOne({ _id: fromCardId });
  const overCard = await Card.findOne({ _id: toCardId });

  if (!activeCard || !overCard) return;

  const activeCardPosition = activeCard.position;
  const overCardPosition = overCard.position;

  const positionDifference = Math.abs(activeCardPosition - overCardPosition);

  if (positionDifference === 1) {
    // console.log("Swapping adjacent cards");
    await Card.updateOne({ _id: fromCardId }, { position: overCardPosition });
    await Card.updateOne({ _id: toCardId }, { position: activeCardPosition });
  } else {
    if (activeCardPosition < overCardPosition) {
      // console.log("Moved top-bottom");
      await Card.updateMany(
        {
          listId,
          position: { $lte: overCardPosition, $gt: activeCardPosition },
        },
        { $inc: { position: -1 } }
      );
    } else {
      // console.log("Moved bottom-top");
      await Card.updateMany(
        {
          listId,
          position: { $gte: overCardPosition, $lt: activeCardPosition },
        },
        { $inc: { position: 1 } }
      );
    }

    await Card.updateOne({ _id: fromCardId }, { position: overCardPosition });
  }

  return await List.findOne({ _id: listId });
};

export const updateCardPositionInDiffLists = async (
  body: IUpdateCardPositionInDiffListsBody
) => {
  const { fromCardId, toCardId, fromListId, toListId } = body;

  const activeCard = await Card.findOne({ _id: fromCardId });
  const overCard = await Card.findOne({ _id: toCardId });
  const activeCardPosition = activeCard?.position;
  const overCardPosition = overCard?.position ? overCard?.position : 1;

  // decrement active list positions
  await Card.updateMany(
    {
      listId: fromListId,
      position: { $gte: activeCardPosition },
    },
    { $inc: { position: -1 } }
  );
  // update rest of the cards position in overList
  await Card.updateMany(
    {
      listId: toListId,
      position: { $gte: overCardPosition },
    },
    { $inc: { position: 1 } }
  );
  // update active card listid and position to over card position
  await Card.findOneAndUpdate(
    { _id: fromCardId },
    { listId: toListId, position: overCardPosition }
  );
  return await List.findOne({ _id: toListId });
};
