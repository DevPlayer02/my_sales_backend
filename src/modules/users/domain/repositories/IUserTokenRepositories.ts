import { IUserToken } from "../models/IUserToken";

export interface IUserTokensRepositories {
  findByToken(token: string): Promise<IUserToken | null>
  generate(user_id: number): Promise<IUserToken>;
}