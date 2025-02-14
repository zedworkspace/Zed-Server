import mongoose, { Schema } from "mongoose";

const userSchema : Schema = new Schema ({
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    passwordHash:{type:String, required:true},
    avatarUrl:{type:String},
    bannerUrl:{type:String},
    gitId:{type:String},
    googleId:{type:String}
});

const User = mongoose.model ('user',userSchema);
export default User;