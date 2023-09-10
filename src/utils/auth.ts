import { API_IDENTIFIER, AUTH0_URL } from "@/config";

const { auth } = require('express-oauth2-bearer');

export const checkJwtMiddleware = auth({
  issuerBaseURL: `${AUTH0_URL}`,
  allowedAudiences: `${API_IDENTIFIER}`
});

