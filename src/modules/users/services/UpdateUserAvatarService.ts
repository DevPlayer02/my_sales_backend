import AppError from "@shared/errors/AppError";
import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload";
import { IUpdateUserAvatar } from "../domain/models/IUpdateUserAvatar";
import { IUsersRepositories } from "../domain/repositories/IUsersRepositories";
import { IUser } from "../domain/models/IUser";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepositories: IUsersRepositories,
  ) { }

  async execute({ userId, avatarFileName }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepositories.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepositories.save(user);

    return user;
  }
}
