import catchAsync from "../utils/catchAsync";
import * as boardService from "../services/boardServices";
export const getProjectBoards = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const boards = await boardService.getProjectBoards({ projectId });
  res
    .status(200)
    .json({
      status: "success",
      message: "Successfully fetched Boards",
      data: boards,
    });
});
