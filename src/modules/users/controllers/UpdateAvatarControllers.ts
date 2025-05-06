import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UpdateAvatarControllers {
  async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      userId: Number(req.user.id),
      avatarFileName: req.file?.filename as string,
    })

    return res.json(user);
  }
}