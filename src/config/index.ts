import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, AUTH0_URL, API_IDENTIFIER, EVENT_CONCURRENCY_LIMIT, EVENT_RATE_LIMIT_PER_SECOND } = process.env;
