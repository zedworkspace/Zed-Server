import catchAsync from "../utils/catchAsync";
import * as listServices from "../services/listServices";

export const createListByBoardId = catchAsync(async (req, res) => {
  const { boardId } = req.params;
  const body = req.body;

  const list = await listServices.createListByBoardId({ boardId, body });

  res.status(200).json({
    status: "success",
    message: "List created Successfully",
    data: list,
  });
});

export const getListsByBoardId = catchAsync(async (req, res) => {
  const { boardId } = req.params;
  const lists = await listServices.getListsByBoardId({ boardId });
  res.status(200).json({
    status: "success",
    message: "Successfully fetched lists",
    data: lists,
  });
});

export const updateListPositions = catchAsync(async (req, res) => {
  const body = req.body;
  const lists = await listServices.updateListPositions(body);
  res.status(200).json({
    status: "success",
    message: "Successfully updated list positions",
    data: lists,
  });
});

export const softDeleteById = catchAsync(async (req, res) => {
  const { listId } = req.params;
  await listServices.softDeleteById(listId);
  res.status(200).json({
    status: "success",
    message: "List deleted successfully",
  });
});
