import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.redirect('/api-docs');
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
