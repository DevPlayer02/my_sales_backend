import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ForgotPasswordController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmailService = container.resolve(SendForgotPasswordEmailService)

    await sendForgotPasswordEmailService.execute({ email });

    return res.status(204).json();
  }
}

