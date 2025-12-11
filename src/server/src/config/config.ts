import dotenvflow from 'dotenv-flow';
import path from 'path'

dotenvflow.config({
    path: path.resolve(__dirname, '../..')
})

export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,

    // DATABASE
    DATABASE_PORT: Number(process.env.DATABASE_PORT),
    DATABASE: process.env.DATABASE as string,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD as string,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME as string,
    DATABASE_HOST: process.env.DATABASE_HOST as string
}