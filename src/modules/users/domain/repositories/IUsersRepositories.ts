import { User } from "@modules/users/infra/database/entities/User";
import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUsersRepositories {
  findByEmail(email: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<User>
  save(user: IUser): Promise<IUser>
  find(): Promise<User[]>;
  findById(id: number): Promise<IUser | null>
}