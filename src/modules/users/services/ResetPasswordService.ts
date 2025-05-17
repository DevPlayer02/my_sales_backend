import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcrypt';
import { IUsersRepositories } from '../domain/repositories/IUsersRepositories';
import { IUserTokensRepositories } from '../domain/repositories/IUserTokenRepositories';
import { inject, injectable } from 'tsyringe';

interface IResetPassword {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepositories: IUsersRepositories,
    @inject('UserTokensRepository')
    private readonly userTokensRepositories: IUserTokensRepositories
  ) { }

  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepositories.findByToken(token);

    if (!userToken) {
      throw new AppError('User token not found', 404);
    }

    const user = await this.usersRepositories.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired', 401);
    }

    user.password = await hash(password, 10);

    await this.usersRepositories.save(user);
  }
}
