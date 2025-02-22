import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    permissions: [{ type: String }], // Example: ["INVITE_MEMBERS", "DELETE_MESSAGES"]
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
});

const Role = mongoose.model("roles", RoleSchema);
export default Role;