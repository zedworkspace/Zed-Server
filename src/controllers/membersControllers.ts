import { Request, Response } from "express";
import Member from "../models/memberModel";

export const getMembersByProject = async (req: Request, res: Response):Promise<any> => {
    const { projectId } = req.params
    const members = await Member.find({ projectId }).populate("userId", "username profileImg");
    
    if (!members.length) {
      return res.status(404).json({ message: "No members found" });
    }
  
    res.status(200).json({ members });
  };
  