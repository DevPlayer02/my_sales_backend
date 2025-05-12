import SessionUserService from '@modules/users/services/SessionUserService';
import { Request, Response } from 'express';

export default class SessionsControllers {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const createSession = new SessionUserService();

    const userToken = await createSession.execute({
      email,
      password,
    });

    return res.json(userToken);
  }
}
