import AppError from "@shared/errors/AppError";
import { customerRepository } from "../database/repositories/CustomerRepositories";

interface IDeleteCustomer {
  id: number;
}

export default class DeleteCustomerService {
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    await customerRepository.remove(customer);
  }
}