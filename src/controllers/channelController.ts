import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import *as channelServices from '../services/channelServices'

export const createChannel = catchAsync (async(req:Request,res:Response) =>{
    
    const newChannel = await channelServices.createChannel(req.body)
    res.status(201).json({
        status:'success',
        message: "Channel created",
        data:newChannel
    })
})


export const getChannelByProjectId = catchAsync (async(req:Request, res:Response) =>{
    const {projectId} = req.params 
    const channel = await channelServices.getChannelByProjectId(projectId)
    res.status(201).json({
        status: 'success',
        message: "get channels by specific project",
        data: channel
    })
})