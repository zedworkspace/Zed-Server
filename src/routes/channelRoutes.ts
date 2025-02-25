import express, { Router } from 'express'
import { createChannel, getChannelByProjectId } from '../controllers/channelController'
import { userAuth } from '../middlewares/userAuth'

const channelRouter: Router = express.Router()

channelRouter.post('/channel',userAuth,createChannel)
channelRouter.get('/channel/:projectId',userAuth,getChannelByProjectId)


export default channelRouter