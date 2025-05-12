import AppError from "@shared/errors/AppError";
import { Order } from "../infra/database/entities/Order";
import { OrderRepostiories } from "../infra/database/repositories/OrderRepositories";


export default class ShowOrderService {
  async execute(id: string): Promise<Order> {
    const order = await OrderRepostiories.findById(Number(id));

    if (!order) {
      throw new AppError("Order not found.");
    }

    return order;
  }
}
