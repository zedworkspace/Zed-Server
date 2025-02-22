import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";

const userSchema: Schema<IUser> = new Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String},
    profileImg:{type:String},
    bannerImg:{type:String},
    gitId:{type:String},
    googleId:{type:String}
});

const User = mongoose.model <IUser> ('user',userSchema);
export default User;