import AppError from '@shared/errors/AppError';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import { inject, injectable } from 'tsyringe';

interface IShowProduct {
  id: number;
}

@injectable()
export default class ShowProductService {
  constructor(
      @inject('ProductsRepository')
      private readonly productsRepositories: IProductsRepositories,
    ) {}

  async execute({ id }: IShowProduct) {
    const product = await this.productsRepositories.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}
