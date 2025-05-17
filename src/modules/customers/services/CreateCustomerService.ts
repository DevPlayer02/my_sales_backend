import AppError from '@shared/errors/AppError';
import { Customer } from '../infra/database/entities/Customer';
import { ICreateCustomer } from '../domain/models/ICreateUser';
import { ICustomersRepositories } from '../domain/repositories/ICustomersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customerRepository: ICustomersRepositories,
  ) {}
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await this.customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 409);
    }

    const customer = this.customerRepository.create({
      name,
      email,
    });

    return customer;
  }
}
