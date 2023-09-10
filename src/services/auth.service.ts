import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { API_IDENTIFIER, SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { AccessTokenResponse, ClientCredentialsRequest } from '@/interfaces/auth.interface';
import Auth0Service from './auth0.service';
import { logger } from '@/utils/logger';
import jwt_decode from "jwt-decode";

class AuthService {

    private auth0Service = new Auth0Service()

    public async getToken(clientCredentialsReq: ClientCredentialsRequest): Promise<AccessTokenResponse> {
        if (isEmpty(clientCredentialsReq)) throw new HttpException(400, "Client credentials mandatory information is empty");
    
        return await this.auth0Service.getAccessToken(clientCredentialsReq)
      }

}

export default AuthService;
