import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import loginRouter from './login';
import apiRouter from './api';
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.MODE === 'development') {
  app.use(morgan('dev'));
}

app.use('/public', express.static(path.join(__dirname, '../public')));

//routers
app.use('/login', loginRouter);
app.use('/api', apiRouter);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), next);
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.sendStatus(err.status || 500);
});

export default app;
