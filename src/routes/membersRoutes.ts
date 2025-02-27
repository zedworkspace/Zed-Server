import express, { Router } from 'express'
import { getMembersByProject, joinProject } from '../controllers/membersControllers'

const memberRouter:Router = express.Router()

memberRouter.post('/project/members/join',joinProject)
memberRouter.get('/project/members/:projectId',getMembersByProject)


export default memberRouter