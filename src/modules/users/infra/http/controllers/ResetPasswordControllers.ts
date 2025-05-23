import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResetPasswordController {
  async create(req: Request, res: Response): Promise<void> {
    const { password, token } = req.body;

    const resetPasswordService = container.resolve(ResetPasswordService)

    await resetPasswordService.execute({
      password,
      token
    });

    res.status(204).json();
  }
}