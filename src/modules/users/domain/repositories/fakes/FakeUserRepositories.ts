import { Pagination } from '@modules/customers/domain/repositories/ICustomersRepositories';
import { User } from '@modules/users/infra/database/entities/User';
import { ICreateUser } from '../../models/ICreateUser';
import { IUser } from '../../models/IUser';
import { IUsersRepositories } from '../IUsersRepositories';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class FakeUserRepositories implements IUsersRepositories {
  find(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  private users: User[] = [];

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find(user => user.email === email) as IUser;
  }

  public async create(userData: ICreateUser): Promise<User> {
    const user = new User();

    user.id = this.users.length + 1;
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    user.getAvatarUrl = function (): string | null {
      if (!this.avatar) {
        return null;
      }
      return `${process.env.APP_API_URL}/files/${this.avatar}`;
    };

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<IUser> {
    const findIndex = this.users.findIndex(
      findUser => findUser.email === user.email,
    );

    if (findIndex !== -1) {
      this.users[findIndex] = user;
    } else {
      this.users.push(user);
    }

    return user as IUser;
  }

  findAll({
    page,
    skip,
    take,
  }: {
    page: number;
    skip: number;
    take: number;
  }): Promise<Pagination> {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
