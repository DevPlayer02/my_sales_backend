import { usersRepositories } from "../infra/database/repositories/UsersRepositories";
import { User } from "../infra/database/entities/User";

export default class ListUsersService {
  public async execute(): Promise<User[]> {
    const users = await usersRepositories.find();

    return users;
  }
}
