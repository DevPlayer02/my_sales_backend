import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../infra/database/entities/Product';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListProductService {
  constructor(
      @inject('ProductsRepository')
      private readonly productsRepositories: IProductsRepositories,
    ) {}

  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-mysales-PRODUCTS_LIST',
    );

    if (!products) {
      products = await this.productsRepositories.find();

      await redisCache.save(
        'api-mysales-PRODUCTS_LIST',
        JSON.stringify(products),
      );

      return products;
    }

    return products;
  }
}
