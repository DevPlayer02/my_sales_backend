import AppError from "@shared/errors/AppError";
import { Customer } from "../infra/database/entities/Customer";
import { customerRepository } from "../infra/database/repositories/CustomerRepositories";
import { ICreateCustomer } from "../domain/models/ICreateUser";

export default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 409);
    }

    const customer = customerRepository.create({
      name,
      email,
    })

    await customerRepository.save(customer);

    return customer;
  }
}