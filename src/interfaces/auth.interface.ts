export interface ClientCredentialsRequest {
    client_id: string,
    client_secret: string,
    audience: string,
    grant_type: string
}

export interface AccessTokenResponse {
    access_token: string,
    scope: string,
    expires_in: number,
    token_type: string
}