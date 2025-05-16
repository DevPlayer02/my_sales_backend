import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICustomersRepositories } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";

interface IShowCustomer {
  id: number;
}

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customerRepository: ICustomersRepositories) { }
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    return customer;
  }
}