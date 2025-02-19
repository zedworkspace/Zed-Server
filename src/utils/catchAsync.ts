import { NextFunction, Request, Response } from "express";

const catchAsync = (fn: (arg0: any, arg1: any, arg2: any) => any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync