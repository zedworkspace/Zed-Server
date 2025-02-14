import express, { Router } from 'express';
import { registerUser } from '../controllers/authControllers';
const authRouter :Router = express.Router();

authRouter.post('/register',registerUser);

export default authRouter;