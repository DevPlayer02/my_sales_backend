import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class OrdersControllers {
  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const showOrder = container.resolve(ShowOrderService)

    const order = await showOrder.execute(id);

    res.json(order);
  }

  async create(req: Request, res: Response): Promise<void> {
    const { customer_id, products } = req.body;

    const createOrder = container.resolve(CreateOrderService)

    const order = await createOrder.execute({ customer_id, products });

    res.json(order);
  }
}
