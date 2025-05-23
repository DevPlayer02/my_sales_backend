import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';

export interface IProductsRepositories {
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  findById(id: number): Promise<IProduct | null>;
  remove(product: IProduct): Promise<void>;
  find(): Promise<IProduct[]>;
  findByName(name: string): Promise<IProduct | null>;
  findAllByIds(ids: number[]): Promise<IProduct[]>;
}
