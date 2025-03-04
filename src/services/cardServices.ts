import Card from "../models/cardModel";

export const createCardByListId = async ({
  listId,
  body,
}: {
  listId: string;
  body: { title: string };
}) => {
  const card = await Card.create({
    listId,
    title: body.title,
  });

  return card;
};
