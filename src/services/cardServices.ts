import Card from "../models/cardModel";
import CustomError from "../utils/CustomError";

type CreateCard = {
  listId: string;
  body: { title: string };
};

export const createCardByListId = async ({ listId, body }: CreateCard) => {
  const card = await Card.create({
    listId,
    title: body.title,
  });
  return card;
};

export const getCardById = async ({ cardId }: { cardId: string }) => {
  if (!cardId) throw new CustomError("Card id is missing!", 400);
  const card = await Card.findById(cardId);
  if (!card)
    throw new CustomError(`Can't find card with this id ${cardId}`, 400);

  // console.log("CARD", card);
  return card;
};

export const editCardById = async (cardId: string, updateData: any) => {
  console.log(updateData,"updayte");
  
  return await Card.findByIdAndUpdate(cardId, updateData, { new: true });
};