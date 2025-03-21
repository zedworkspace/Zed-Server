import Activity from "../models/activityModel";

export const getActivitiesByEntityId = async (entityId: string) => {
  const activities = await Activity.find({ entityId }).populate("user");
  return activities;
};
