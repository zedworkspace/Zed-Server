import express, { Router } from 'express'
import { getProfile, logoutUser, updateProfile } from '../controllers/profileController'
import upload from '../middlewares/imageUploadingMiddleware'
import { userAuth } from '../middlewares/userAuth'

const profileRouter : Router= express.Router()

profileRouter.get('/profile',userAuth,getProfile)
profileRouter.put('/profile/update',upload.single('profileImg'),userAuth,updateProfile)
profileRouter.post('/logout', userAuth, logoutUser);


export default profileRouter

