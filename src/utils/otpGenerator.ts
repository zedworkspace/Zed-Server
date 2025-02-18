import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import { config } from '../configs/config';

// Generate OTP
export const generateOtp = (): string => {
  return otpGenerator.generate(6, { 
    upperCaseAlphabets: false, 
    lowerCaseAlphabets: false, 
    specialChars: false,  
    digits: true,
  });
};

// Sent email
export const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL, 
        pass: config.APP_PASSWORD, 
      },
    });

    const mailOptions = {
      from: config.EMAIL, 
      to: email,          
      subject: 'Your OTP Code', 
      text: `Your OTP code is: ${otp}`,
    };
    console.log(mailOptions);
    
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error: any) {
    console.error('Error sending OTP:', error.message || error);
    throw new Error('Failed to send OTP. Please try again later.');
  }
};
