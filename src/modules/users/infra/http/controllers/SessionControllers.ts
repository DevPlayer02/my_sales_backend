import SessionUserService from '@modules/users/services/SessionUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsControllers {
  public async create(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const createSession = container.resolve(SessionUserService)

    const userToken = await createSession.execute({
      email,
      password,
    });

    res.json(userToken);
  }
}
