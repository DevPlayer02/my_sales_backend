import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { Order } from "@modules/orders/infra/database/entities/Order";
import { Product } from "@modules/products/infra/database/entities/Product";
import { ICreateOrderProducts } from "@shared/interfaces/createOrderProducts.interface";

export interface IOrdersRepositories {
  findById(id: number): Promise<Order | null>;
  findAllByIds(id: number[]): Promise<Product[]>;
  createOrder(customer: ICustomer, product: ICreateOrderProducts): Promise<Order>;
  save(product: Product): Promise<Product>;
}