import Card from "../models/cardModel";
import List from "../models/listModel";
import CustomError from "../utils/CustomError";

type CreateCard = {
  listId: string;
  body: { title: string };
};

export const createCardByListId = async ({ listId, body }: CreateCard) => {
  const lastCard = await Card.findOne({ listId }).sort("-position");

  const position = lastCard ? lastCard?.position + 1 : 1;

  const card = await Card.create({
    listId,
    title: body.title,
    position,
  });
  console.log("Card ", card);
  return card;
};

export const getCardById = async ({ cardId }: { cardId: string }) => {
  if (!cardId) throw new CustomError("Card id is missing!", 400);
  const card = await Card.findById(cardId);
  if (!card)
    throw new CustomError(`Can't find card with this id ${cardId}`, 400);

  return card;
};

export const editCardById = async (cardId: string, updateData: any) => {
  console.log(updateData, "updayte");

  return await Card.findByIdAndUpdate(cardId, updateData, { new: true });
};

type UpdateCardPositionInSameListBody = {
  listId: string;
  fromCardId: string;
  toCardId: string;
};

export const updateCardPositionInSameList = async (
  body: UpdateCardPositionInSameListBody
) => {
  const { fromCardId, listId, toCardId } = body;
  const activeCard = await Card.findOne({ _id: fromCardId });
  const overCard = await Card.findOne({ _id: toCardId });

  const activeCardPosition = activeCard?.position;
  const overCardPosition = overCard?.position;

  await Card.findOneAndUpdate(
    {
      _id: fromCardId,
    },
    { position: overCardPosition }
  );
  await Card.findOneAndUpdate(
    {
      _id: toCardId,
    },
    { position: activeCardPosition }
  );
  return await List.findOne({ _id: listId });
};

type UpdateCardPositionInDiffListsBody = {
  fromListId: string;
  toListId: string;
  fromCardId: string;
  toCardId: string;
};

export const updateCardPositionInDiffLists = async (
  body: UpdateCardPositionInDiffListsBody
) => {
  const { fromCardId, toCardId, toListId } = body;

  const overCard = await Card.findOne({ _id: toCardId });
  const overCardPosition = overCard?.position;

  await Card.updateMany(
    {
      listId: toListId,
      position: { $gte: overCardPosition },
    },
    { $inc: { position: 1 } }
  );

  await Card.findOneAndUpdate(
    { _id: fromCardId },
    { listId: toListId, position: overCardPosition }
  );
  return await List.findOne({ _id: toListId });
};
