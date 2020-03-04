import dotenv from 'dotenv';
import 'reflect-metadata';
import app from './server';
dotenv.config();

app.listen(process.env.DEV_PORT);
console.log(`Server liste on port: ${process.env.DEV_PORT}`)