import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { Product } from '../entities/Product';
import { In, Repository } from 'typeorm';
import { IProductsRepositories } from '@modules/products/domain/repositories/IProductsRepositories';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';

export class productsRepositories implements IProductsRepositories {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  async create({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    })

    await this.ormRepository.save(product)

    return product;
  }

  async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);

    return product;
  }

  async findById(id: number): Promise<IProduct | null> {
    const product = await this.ormRepository.findOneBy({ id })

    return product
  }

  async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product);

    return;
  }

  async find(): Promise<IProduct[]> {
    const products = await this.ormRepository.find()

    return products;
  }

  async findByName(name: string): Promise<IProduct | null> {
    const product = await this.ormRepository.findOneBy({ name })

    return product
  }
}
