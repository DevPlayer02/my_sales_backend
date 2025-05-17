import AppError from '@shared/errors/AppError';
import { User } from '../infra/database/entities/User';
import { hash } from 'bcrypt';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepositories } from '../domain/repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepositories: IUsersRepositories,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await this.usersRepositories.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = this.usersRepositories.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
