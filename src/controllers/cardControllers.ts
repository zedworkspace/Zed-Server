import catchAsync from "../utils/catchAsync";
import * as cardServices from "../services/cardServices";
import *as memberServices from '../services/membersServices'

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

export const editCardById = catchAsync(async (req, res) => {
  const { cardId, projectId } = req.params; 
  const { title, labels, description } = req.body;

 
  const projectMembers = await memberServices.getMembersByProject(projectId)

  if (!projectMembers) {
    return res.status(404).json({ message: "Project members not found" });
  }


  const updateData = {
    title,
    labels,
    description,
    assignees: projectMembers 
  };

  
  const updatedCard = await cardServices.editCardById(cardId, updateData);

  if (!updatedCard) {
    return res.status(404).json({ message: "Card not found" });
  }

  res.status(200).json({
    status: "Success",
    message: "Card updated successfully",
    data: updatedCard,
  });
});

export const updateCardPositionInDnd = catchAsync(async (req, res) => {
  const body = req.body;
  const list = await cardServices.updateCardPositionInDnd(body);
  res.status(200).json({
    status: "Success",
    message: "Card position updated successfully",
    data: list,
  });
});
export const updateCardPositionInSameList = catchAsync(async (req, res) => {
  const body = req.body;
  const list = await cardServices.updateCardPositionInSameList(body);
  res.status(200).json({
    status: "Success",
    message: "Card position updated successfully",
    data: list,
  });
});

export const updateCardPositionInDiffLists = catchAsync(async (req, res) => {
  const body = req.body;
  const list = await cardServices.updateCardPositionInDiffLists(body);
  res.status(200).json({
    status: "Success",
    message: "Card position updated successfully",
    data: list,
  });
});
