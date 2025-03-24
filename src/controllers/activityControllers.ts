import catchAsync from "../utils/catchAsync";
import * as activityService from "../services/activityServices";

export const getActivitiesByEntityId = catchAsync(async (req, res) => {
  const { entityId } = req.params;
  const activities = await activityService.getActivitiesByEntityId(entityId);
  res.status(200).json({
    status: "success",
    message: "Successfully fetched card activities",
    data: activities,
  });
});
