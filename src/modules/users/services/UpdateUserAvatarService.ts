import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import path from "path";
import fs from "fs";
import uploadConfig from "@config/upload";

interface IUpdateUserAvatar {
  userId: number;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  async execute({ userId, avatarFileName }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    console.log(avatarFileName)

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      console.log('userAvatarFileExists',userAvatarFileExists)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepositories.save(user);
    return user;
  }
}