import dotenvflow from 'dotenv-flow';

dotenvflow.config();

export default {
    ENV: process.env,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DATABASE_URL: process.env.DATABASE_URL
}