import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    joinedAt: { type: Date, default: Date.now },
});

const Member = mongoose.model("members", MemberSchema);
export default Member;