import AppError from '@shared/errors/AppError';
import { Product } from '../infra/database/entities/Product';
import { productsRepositories } from '../infra/database/repositories/ProductsRepositories';
import RedisCache from '@shared/cache/RedisCache';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UpdateProductService {
  constructor(
      @inject('ProductsRepository')
      private readonly productsRepositories: IProductsRepositories,
    ) {}

  async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const redisCache = new RedisCache();
    const product = await this.productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productExists = await this.productsRepositories.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepositories.save(product);

    await redisCache.invalidate('api-mysales-PRODUCTS_LIST');

    return product;
  }
}
