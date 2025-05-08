import { usersRepositories } from "../database/repositories/UsersRepositories";
import { User } from "../database/entities/User";

export default class ListUsersService {
  public async execute(): Promise<User[]> {
    const users = await usersRepositories.find();

    return users;
  }
}