import User from "../models/userModel";

export const getUserProfile = async (userId: string) => {
        const profile = await User.findById(userId)
            .select("-password")
            // .populate("projects");
        if (!profile) {
            throw new Error("User not found");
        }
        return profile;
};

