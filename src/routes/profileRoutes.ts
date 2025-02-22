import express, { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/profileController'
import upload from '../middlewares/imageUploadingMiddleware'

const profileRouter : Router= express.Router()

profileRouter.get('/profile/:userId',getProfile)
profileRouter.put('/profile/update/:userId',upload.single('profileImg'),updateProfile)


export default profileRouter

