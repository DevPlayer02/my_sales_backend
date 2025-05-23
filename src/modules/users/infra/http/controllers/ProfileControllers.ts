import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express'
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<void> {
    const showProfile = container.resolve(ShowProfileService)
    const user_id = Number(req.user.id);

    const user = await showProfile.execute({ user_id });
    res.json(user);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const user_id = Number(req.user.id);
    const { name, email, password, old_password } = req.body;
    const updateProfile = container.resolve(UpdateProfileService)
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    res.json(user);
  }
}