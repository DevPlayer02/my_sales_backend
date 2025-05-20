import AppError from '@shared/errors/AppError';
import { customerMock } from '../domain/factories/customerFactory';
import FakeCustomerRepositories from '../domain/repositories/fakes/FakeCustomerRepositories';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomerRepositories: FakeCustomerRepositories;
let createCustomer: CreateCustomerService;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomerRepositories = new FakeCustomerRepositories();
    createCustomer = new CreateCustomerService(fakeCustomerRepositories);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute(customerMock);

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('Jon Doe');
    expect(customer.email).toBe('john@gmail.com');
  });

  it('should not be able to create a new customer with email that is alerady in use', async () => {
    await createCustomer.execute(customerMock);

    await expect(createCustomer.execute(customerMock)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
