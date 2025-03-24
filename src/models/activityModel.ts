import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "entityType",
  },
  entityType: {
    type: String,
    required: true,
    enum: ["Card", "Profile", "Project"],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  oldValue: { type: String },
  newValue: { type: String },
  timestamp: { type: Date, default: Date.now },
});

// Discriminator Setup
const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
