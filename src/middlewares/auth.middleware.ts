import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if(!authorization) {
      next(new HttpException(401, 'Authentication token missing'));
    }
    next();
  } catch (error) {
    next(new HttpException(401, 'Invalid authentication token'));
  }
};

export default authMiddleware;
