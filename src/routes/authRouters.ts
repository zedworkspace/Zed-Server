import express, { Router } from 'express';
import { accessTokenGenerator, emailRegister, emailSignIn, resetPassword, sendOtp, sendResetOtp } from '../controllers/authControllers';
import { userAuth } from '../middlewares/userAuth';

const authRouter :Router = express.Router();

authRouter.post('/v1/otp-request',sendOtp);
authRouter.post('/v1/register',emailRegister);
authRouter.post('/v1/signin',emailSignIn);
authRouter.post('/v1/get-access-token',accessTokenGenerator);
authRouter.post('/v1/reset-otp-request',sendResetOtp);
authRouter.post('/v1/reset-password',resetPassword);

export default authRouter;