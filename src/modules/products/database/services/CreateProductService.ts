import AppError from '@shared/errors/AppError';
import { Product } from '../entities/Product';
import { productsRepositories } from '../repositories/ProductsRepositories';

interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  async excute({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const productExists = await productsRepositories.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    const product = productsRepositories.create({
      name,
      price,
      quantity,
    });

    await productsRepositories.save(product);

    return product;
  }
}
