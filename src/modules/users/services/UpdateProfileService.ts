import AppError from "@shared/errors/AppError";
import { User } from "../infra/database/entities/User";
import { usersRepositories } from "../infra/database/repositories/UsersRepositories";
import { compare } from "bcrypt";
import { hash } from "bcrypt";


interface IUpdateProfile {
  user_id: number;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<User> {
    const user = await usersRepositories.findById(user_id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (email) {
      const userUpdateEmail = await usersRepositories.findByEmail(email);
      if (userUpdateEmail) {
        throw new AppError("Email already in use.", 409);
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new AppError("Old password is required.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match.");
      }

      user.password = await hash(password, 10);
    }

    if (name) {
      user.name = name;
    }

    await usersRepositories.save(user);

    return user;
  }
}
