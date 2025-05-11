import AppError from '@shared/errors/AppError';
import { productsRepositories } from '../database/repositories/ProductsRepositories';
import RedisCache from '@shared/cache/RedisCache';

interface IDeleteProduct {
  id: string;
}

export default class DeleteProductService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const redisCache = new RedisCache();
    const product = await productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await redisCache.invalidate('api-mysales-PRODUCTS_LIST');

    await productsRepositories.remove(product);
  }
}
