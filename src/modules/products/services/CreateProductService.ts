import AppError from '@shared/errors/AppError';
import { Product } from '../infra/database/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepositories: IProductsRepositories,
  ) {}

  async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const redisCache = new RedisCache();
    const productExists = await this.productsRepositories.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    const product = this.productsRepositories.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-mysales-PRODUCTS_LIST');

    return product;
  }
}
