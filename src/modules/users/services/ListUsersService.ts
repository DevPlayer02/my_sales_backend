import { User } from "../infra/database/entities/User";
import { IUsersRepositories } from "../domain/repositories/IUsersRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepositories: IUsersRepositories,
  ) { }

  public async execute(): Promise<User[]> {
    const users = await this.usersRepositories.find();

    return users;
  }
}
