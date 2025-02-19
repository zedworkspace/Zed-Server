import { NextFunction, Request, Response } from "express";

export const asyncErrorHandler = function (
  func: (req: Request, res: Response) => Promise<void>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res).catch((err) => next(err));
  };
};
