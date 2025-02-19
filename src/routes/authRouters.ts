import express, { Router } from 'express';
import { emailRegister, emailSignin, sendOtp } from '../controllers/authControllers';

const authRouter :Router = express.Router();

authRouter.post('/v1/otp-request',sendOtp);
authRouter.post('/v1/register',emailRegister);
authRouter.post('/v1/signin',emailSignin);

export default authRouter;