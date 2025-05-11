import AppError from '@shared/errors/AppError';
import { Product } from '../database/entities/Product';
import { productsRepositories } from '../database/repositories/ProductsRepositories';
import RedisCache from '@shared/cache/RedisCache';

interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const redisCache = new RedisCache();
    const product = await productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productExists = await productsRepositories.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepositories.save(product);

    await redisCache.invalidate('api-mysales-PRODUCTS_LIST');

    return product;
  }
}
