import AppError from "@shared/errors/AppError";
import { Order } from "../infra/database/entities/Order";
import { IOrdersRepositories } from "../domain/repositories/IOrdersRepositories";


export default class ShowOrderService {
  constructor(
    private readonly orderRepositories: IOrdersRepositories
  ) {}
  async execute(id: string): Promise<Order> {
    const order = await this.orderRepositories.findById(Number(id));

    if (!order) {
      throw new AppError("Order not found.");
    }

    return order;
  }
}
