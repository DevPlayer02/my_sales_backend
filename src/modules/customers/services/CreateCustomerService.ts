import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { ICreateCustomer } from "../domain/models/ICreateUser";
import { ICustomersRepositories } from "../domain/repositories/ICustomersRepositories";

export default class CreateCustomerService {
  constructor(private readonly customerRepositories: ICustomersRepositories) { }
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await this.customerRepositories.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 409);
    }

    const customer = this.customerRepositories.create({
      name,
      email,
    })

    return customer;
  }
}