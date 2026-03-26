import express from 'express';
import connectDb from './config/db.js';
import { config } from './config/config.js';
import authRouter from './routes/authRoutes.js';
import taskRouter from './routes/taskRoutes.js';

const app = express();
const { port } = config;

app.use(express.json());

app.use('/api', authRouter);
app.use('/api', taskRouter);

const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server listening on port ${port} and starting at http://localhost:${port}`);
  });
};

startServer();
