import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default class ErrorHandleMiddleware {
  public static handleError: Promise<void>(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        type: 'error',
        message: err.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}
