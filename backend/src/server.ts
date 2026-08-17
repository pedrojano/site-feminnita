import { app } from './app';
import { env } from './config/env';
import { startExpireOrderJob } from './jobs/expireOrder.Job';

app.listen(env.port, () => {
    console.log(`Server is Runing on Port ${env.port}`)
})

startExpireOrderJob();