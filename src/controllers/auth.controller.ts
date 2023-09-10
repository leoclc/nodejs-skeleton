import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { ClientCredentialsRequest } from '@/interfaces/auth.interface';

class AuthController {
  public authService = new AuthService();

  public getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientCredentialsReq = req.body as ClientCredentialsRequest; 
      const result = await this.authService.getToken(clientCredentialsReq);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

}

export default AuthController;
