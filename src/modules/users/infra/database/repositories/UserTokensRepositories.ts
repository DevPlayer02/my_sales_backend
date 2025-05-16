import { AppDataSource } from '@shared/infra/typeorm/data-source';
import UserToken from '../entities/UserToken';
import { Repository } from 'typeorm';
import { IUserToken } from '@modules/users/domain/models/IUserToken';
import { IUserTokensRepositories } from '@modules/users/domain/repositories/IUserTokenRepositories';


export class userTokensRepositories implements IUserTokensRepositories {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken);
  }

  async generate(user_id: number): Promise<IUserToken> {
    const userToken = this.ormRepository.create({ user_id });
    await this.ormRepository.save(userToken);
    return userToken;
  }

  async findByToken(token: string): Promise<IUserToken | null> {
    const userToken = await this.ormRepository.findOneBy({ token });
    return userToken;
  }
}
