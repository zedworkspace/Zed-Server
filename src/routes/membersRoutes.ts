import express, { Router } from 'express'
import { getMembersByProject } from '../controllers/membersControllers'

const memberRouter:Router = express.Router()

memberRouter.get('/project/members/:projectId',getMembersByProject)


export default memberRouter