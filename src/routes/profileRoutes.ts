import express, { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/profileController'
import upload from '../middlewares/imageUploadingMiddleware'
import { userAuth } from '../middlewares/userAuth'

const profileRouter : Router= express.Router()

profileRouter.get('/profile/:userId',userAuth,getProfile)
profileRouter.put('/profile/update/:userId',upload.single('profileImg'),userAuth,updateProfile)


export default profileRouter

