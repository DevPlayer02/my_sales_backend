import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import { inject, injectable } from 'tsyringe';

interface IDeleteProduct {
  id: number;
}

@injectable()
export default class DeleteProductService {
  constructor(
      @inject('ProductsRepository')
      private readonly productsRepositories: IProductsRepositories,
    ) {}

  async execute({ id }: IDeleteProduct): Promise<void> {
    const redisCache = new RedisCache();
    const product = await this.productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await redisCache.invalidate('api-mysales-PRODUCTS_LIST');

    await this.productsRepositories.remove(product);
  }
}
