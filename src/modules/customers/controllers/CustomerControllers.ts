import { Request, Response } from 'express';
import ListCustomersService from '../services/ListCustomersService';
import ShowCustomerService from '../services/ShowCustomerService';
import CreateCustomerService from '../services/CreateCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

export default class CustomerControllers {
  async index(req: Request, res: Response): Promise<Response> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const listCustomers = new ListCustomersService();
    const customers = await listCustomers.execute(page, limit);
    return res.json(customers);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const showCustomer = new ShowCustomerService();
    const customers = await showCustomer.execute({ id });
    return res.json(customers);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const createCustomer = new CreateCustomerService();
    const customers = await createCustomer.execute({ name, email });
    return res.json(customers);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const id = Number(req.params.id);
    const updateCustomer = new UpdateCustomerService();
    const customers = await updateCustomer.execute({ name, email, id });
    return res.json(customers);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const deleteCustomer = new DeleteCustomerService();
    await deleteCustomer.execute({ id });
    return res.status(204).json([]);
  }
}
