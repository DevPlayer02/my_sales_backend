import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import '@shared/container';

import routes from './routes';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';
import rateLimiter from '@shared/middlewares/rateLimiter';
import { AppDataSource } from '../typeorm/data-source';
import { Request, Response, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';

const startServer = async () => {
  await AppDataSource.initialize();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(routes);
  app.use(errors());
  interface CustomError extends Error {
    status?: number;
  }

  const errorHandler: ErrorRequestHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    ErrorHandleMiddleware.handleError(err, req, res, next);
    return;
  };

  app.use(errorHandler);
  app.use(rateLimiter);

  console.log('Database connected successfully');

  return app;
};

export default startServer()
  .then(app => {
    return app.listen(3333, () => {
      console.log('Server is running on port 3333');
    });
  })
  .catch(error => {
    console.error('Failed to connect to the server:', error);
  });
