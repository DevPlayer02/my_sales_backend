import AppError from '@shared/errors/AppError';
import { Order } from '../infra/database/entities/Order';
import { productsRepositories } from '@modules/products/infra/database/repositories/ProductsRepositories';
import { ICreateOrder } from '../domain/models/ICreateOrder';
import { IOrdersRepositories } from '../domain/repositories/IOrdersRepositories';
import { ICustomersRepositories } from '@modules/customers/domain/repositories/ICustomersRepositories';

export default class CreateOrderService {
  constructor(
    private readonly orderRepositories: IOrdersRepositories,
    private readonly customerRepositories: ICustomersRepositories
  ) { }
  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await this.customerRepositories.findById(
      Number(customer_id),
    );

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await productsRepositories.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
        404,
      );
    }

    const quantityAvailable = products.filter(product => {
      existsProducts.filter(
        productExistent => productExistent.id === product.id,
      )[0].quantity < product.quantity;
    });

    if (!quantityAvailable.length) {
      throw new AppError(
        "The quantity is not available for.",
        409,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(
        productExistent => productExistent.id === product.id,
      )[0].price,
    }));

    const order = await this.orderRepositories.createOrder(
      customerExists,
      { products: serializedProducts }
    );

    const { order_products } = order;

    const updatedProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(
          productExistent => productExistent.id === product.product_id,
        )[0].quantity - product.quantity,
    }));

    await productsRepositories.save(updatedProductsQuantity);

    return order;
  }
}
