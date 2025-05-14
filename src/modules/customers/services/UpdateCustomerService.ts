import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICustomersRepositories } from "../domain/repositories/ICustomersRepositories";

interface IUpdateCustomer {
  id: number;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  constructor(private readonly customerRepositories: ICustomersRepositories) { }
  public async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customerRepositories.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    const customerExists = await this.customerRepositories.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError("There is already one customer with this email.");
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepositories.save(customer);

    return customer;
  }
}