import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);

app.use('/graphql', cookieParser());

export default app;
