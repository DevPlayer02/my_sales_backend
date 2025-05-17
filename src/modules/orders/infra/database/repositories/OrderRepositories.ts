import { Order } from "../entities/Order";
import { ICreateOrderProducts } from "@shared/interfaces/createOrderProducts.interface";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { IOrdersRepositories } from "@modules/orders/domain/repositories/IOrdersRepositories";
import { Repository, In } from "typeorm";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { Product } from "@modules/products/infra/database/entities/Product";

export default class orderRepositories implements IOrdersRepositories {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  async findById(id: number): Promise<Order | null> {
    const order = await this.ormRepository.findOneBy({ id });

    return order;
  }

  async findAllByIds(ids: number[]): Promise<Product[]> {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.findBy({
      id: In(ids),
    });

    return products;
  }

  async createOrder(customer: ICustomer, order_products: ICreateOrderProducts): Promise<Order> {
    const order = this.ormRepository.create({
    customer,
    order_products: order_products.products.map(p => ({
      product_id: p.product_id,
      price: p.price,
      quantity: p.quantity,
    }))
    })

    await this.ormRepository.save(order);

    return order;
  }

  async save(product: Product): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product);
    const savedProduct = await productRepository.save(product);

    return savedProduct;
  }

}
