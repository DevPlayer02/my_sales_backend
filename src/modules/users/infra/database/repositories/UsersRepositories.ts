import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { User } from "../entities/User";
import { IUsersRepositories } from "@modules/users/domain/repositories/IUsersRepositories";
import { Repository } from "typeorm";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUser } from "@modules/users/domain/models/IUser";

export default class usersRepositories implements IUsersRepositories {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ email })

    return user
  }

  async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({
      name,
      email,
      password
    })

    await this.ormRepository.save(user)

    return user
  }

  async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user);

    return user;
  }

  async find(): Promise<IUser[]> {
      const users = await this.ormRepository.find()

      return users;
    }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ id })

    return user
  }
}
