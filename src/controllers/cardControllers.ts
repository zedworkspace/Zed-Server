import catchAsync from "../utils/catchAsync";
import * as cardServices from "../services/cardServices";

export const createCardByListId = catchAsync(async (req, res) => {
  const { listId } = req.params;
  const body = req.body;
  const card = await cardServices.createCardByListId({ listId, body });

  res.status(200).json({
    status: "success",
    message: "Successfully fetched cards",
    data: card,
  });
});

export const getCardById = catchAsync(async (req, res) => {
  const { cardId } = req.params;
  const card = await cardServices.getCardById({ cardId });
  res.status(200).json({
    status: "success",
    message: "Successfully fetched card",
    data: card,
  });
});
