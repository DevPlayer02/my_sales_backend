import { Request, Response } from 'express';
import SessionUserService from '../services/SessionUserService';

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
