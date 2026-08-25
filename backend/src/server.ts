import express from 'express';
import cors from 'cors';
import { app } from './app';
import { env } from './config/env';
import { startExpireOrderJob } from './jobs/expireOrder.Job';

app.use(cors({
    origin: [
        'https://site-feminnita.vercel.app',
        'http://localhost:3000'
    ],
    credentials: true
}));

app.listen(env.port, () => {
    console.log(`Server is Runing on Port ${env.port}`)
})

startExpireOrderJob();