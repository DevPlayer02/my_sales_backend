import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResetPasswordController {
  async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;

    const resetPasswordService = container.resolve(ResetPasswordService)

    await resetPasswordService.execute({
      password,
      token
    });

    return res.status(204).json();
  }
}