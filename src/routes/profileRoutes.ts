import express, { Router } from 'express'
import { getProfile } from '../controllers/profileController'

const profileRouter : Router= express.Router()

profileRouter.get('/profile/:userId',getProfile)


export default profileRouter

