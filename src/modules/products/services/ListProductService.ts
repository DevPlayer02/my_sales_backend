import RedisCache from '@shared/cache/RedisCache';
import { Product } from '../database/entities/Product';
import { productsRepositories } from '../database/repositories/ProductsRepositories';

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-mysales-PRODUCTS_LIST',
    );

    if (!products) {
      products = await productsRepositories.find();

      await redisCache.save(
        'api-mysales-PRODUCTS_LIST',
        JSON.stringify(products),
      );

      return products;
    }

    return products;
  }
}
