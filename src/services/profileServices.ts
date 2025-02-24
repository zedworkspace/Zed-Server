import { Profile } from "../interfaces/profileInterface";
import User from "../models/userModel";
import CustomError from "../utils/CustomError";

export const getUserProfile = async (userId: string) => {
    const profile = await User.findById(userId)
        .select("-password")
        // .populate("projects");
    if (!profile) {
        throw new Error("User not found");
    }
    return profile;
};


export const updateUserProfile = async (userData : Profile,userId : string, profileImg:Express.Multer.File | undefined) => {
    const {name,bio} = userData
    const user = await User.findById(userId)

    if (!user) {
        throw new CustomError("User not found", 404);
    }

    if (name) {
        const existingUser = await User.findOne({ name });
        if (existingUser && existingUser._id.toString() !== userId) {
             throw new CustomError("Username already taken", 400)  
        }
        user.name = name;
    }
    if(profileImg) {
        user.profileImg = profileImg.path
    }
    await user.save()

    return user
}
