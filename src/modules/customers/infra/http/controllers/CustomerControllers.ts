import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomersService from '@modules/customers/services/ListCustomersService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CustomerControllers {
  async index(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const listCustomers = container.resolve(ListCustomersService);
    const customers = await listCustomers.execute(page, limit);
    res.json(customers);
  }

  async show(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const showCustomer = container.resolve(ShowCustomerService);
    const customers = await showCustomer.execute({ id });
    res.json(customers);
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;
    const createCustomer = container.resolve(CreateCustomerService);
    const customers = await createCustomer.execute({ name, email });
    res.json(customers);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;
    const id = Number(req.params.id);
    const updateCustomer = container.resolve(UpdateCustomerService);
    const customers = await updateCustomer.execute({ name, email, id });
    res.json(customers);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const deleteCustomer = container.resolve(DeleteCustomerService);
    await deleteCustomer.execute({ id });
    res.status(204).json([]);
  }
}
