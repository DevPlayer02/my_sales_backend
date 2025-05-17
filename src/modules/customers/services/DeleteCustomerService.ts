import AppError from "@shared/errors/AppError";
import { ICustomersRepositories } from "../domain/repositories/ICustomersRepositories";
import { inject, injectable } from "tsyringe";

interface IDeleteCustomer {
  id: number;
}

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private readonly customerRepository: ICustomersRepositories) { }
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    await this.customerRepository.remove(customer);
  }
}