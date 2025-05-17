import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICustomersRepositories } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";

interface IUpdateCustomer {
  id: number;
  name: string;
  email: string;
}

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customerRepository: ICustomersRepositories) { }
  public async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    const customerExists = await this.customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError("There is already one customer with this email.");
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);

    return customer;
  }
}