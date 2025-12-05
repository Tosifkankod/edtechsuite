import dotenvflow from 'dotenv-flow';
import path from 'path'

dotenvflow.config({
    path: path.resolve(__dirname, '../..')
})


export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DATABASE_URL: process.env.DATABASE_URL
}