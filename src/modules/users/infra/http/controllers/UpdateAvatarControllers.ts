import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { Request, Response } from "express";
import { container } from 'tsyringe';

export default class UpdateAvatarControllers {
  async update(req: Request, res: Response): Promise<void> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      userId: Number(req.user.id),
      avatarFileName: req.file?.filename as string,
    })

    res.json(user);
  }
}