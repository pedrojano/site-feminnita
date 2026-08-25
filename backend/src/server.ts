// import express from 'express';
// import cors from 'cors';
// import { app } from './app';
// import { env } from './config/env';
// import { startExpireOrderJob } from './jobs/expireOrder.Job';

// const app = express();

// app.use(cors({
//     origin: [
//         'https://site-feminnita.vercel.app',
//         'http://localhost:3000'
//     ],
//     credentials: true
// }));

// app.listen(env.port, () => {
//     console.log(`Server is Runing on Port ${env.port}`)
// })

import express from 'express';
import cors from 'cors';

const app = express();

const allowedOrigins = [
    'https://site-feminnita.vercel.app',
    'http://localhost:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado pelo CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));