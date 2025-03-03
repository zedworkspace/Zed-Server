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
