import dotenv from 'dotenv';
import 'reflect-metadata';
import app from './server';
dotenv.config();

app.listen(process.env['NODE_ENV'] === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT);
console.log(`Server liste on port: ${process.env.DEV_PORT}`)