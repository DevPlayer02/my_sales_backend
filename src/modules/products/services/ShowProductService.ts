import AppError from '@shared/errors/AppError';
import { productsRepositories } from '../database/repositories/ProductsRepositories';

interface IShowProduct {
  id: string;
}

export default class ShowProductService {
  async execute({ id }: IShowProduct) {
    const product = await productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}
