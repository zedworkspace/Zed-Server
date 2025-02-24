import express, { Router } from 'express';
import { accessTokenGenerator, emailRegister, emailSignIn, githubAuth, googleAuth, resetPassword, sendOtp, sendResetOtp } from '../controllers/authControllers';

const authRouter :Router = express.Router();

authRouter.post('/v1/otp-request',sendOtp);
authRouter.post('/v1/register',emailRegister);
authRouter.post('/v1/signin',emailSignIn);
authRouter.post('/v1/get-access-token',accessTokenGenerator);
authRouter.post('/v1/reset-otp-request',sendResetOtp);
authRouter.post('/v1/reset-password',resetPassword);
authRouter.post('/v1/auth/google',googleAuth);
authRouter.post('/v1/auth/github/callback',githubAuth);

export default authRouter;