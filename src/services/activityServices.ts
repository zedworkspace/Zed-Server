import Activity from "../models/activityModel";

export const getActivitiesByEntityId = async (entityId: string) => {
  console.log("entityId", entityId);
  const activities = await Activity.find({ entityId }).populate("user")
  console.log("activities", activities);
  return activities
};
