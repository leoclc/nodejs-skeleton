import { AUTH0_URL } from "@/config";
import { AccessTokenResponse, ClientCredentialsRequest } from "@/interfaces/auth.interface";

const axios = require('axios');

class Auth0Service {

    public async getAccessToken(clientCredentialsReq: ClientCredentialsRequest): Promise<AccessTokenResponse> {
        const options = {
            method: 'POST',
            url: `${AUTH0_URL}/oauth/token`,
            data: clientCredentialsReq
        };
        const result = await axios.request(options)
        .catch(function (error: any) {
            throw error
        });
        return result.data;
    }

}

export default Auth0Service