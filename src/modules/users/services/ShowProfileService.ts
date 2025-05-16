import AppError from "@shared/errors/AppError";
import { IUsersRepositories } from "../domain/repositories/IUsersRepositories";
import { IUser } from "../domain/models/IUser";
import { inject, injectable } from "tsyringe";

interface IShowProfile {
  user_id: number;
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepositories: IUsersRepositories,
  ) { }

  async execute({ user_id }: IShowProfile): Promise<IUser> {
    const user = await this.usersRepositories.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}
