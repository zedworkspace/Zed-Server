import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    isOwner: { type: Boolean, default: false},
    status: { type: String, enum: ["active", "left"], default: "active" },
    leftAt: { type: Date, default: null, required: false },
    joinedAt: { type: Date, default: Date.now },
});


const Member = mongoose.model("Member", MemberSchema);
export default Member;