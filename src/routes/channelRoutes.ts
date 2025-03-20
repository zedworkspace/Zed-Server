import express, { Router } from 'express'
import { createChannel, getChannelById, getChannelByProjectId } from '../controllers/channelController'
import { userAuth } from '../middlewares/userAuth'

const channelRouter: Router = express.Router()

channelRouter.post('/channel',userAuth,createChannel)
channelRouter.get('/channel/:projectId',userAuth,getChannelByProjectId)
channelRouter.get('/channel/:projectId/:channelId',userAuth,getChannelById)


export default channelRouter