import { ICreateCustomer } from "@modules/customers/domain/models/ICreateUser";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { ICustomersRepositories, Pagination } from "@modules/customers/domain/repositories/ICustomersRepositories";
import { Customer } from "../../../infra/database/entities/Customer";


export default class FakeCustomerRepositories implements ICustomersRepositories {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = this.customers.length+1;
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id
    )

    this.customers[findIndex] = customer;

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    const index = this.customers.findIndex(
      customer => customer.id === customer.id
    )
    if (index !== -1) {
      this.customers.splice(index, 1)
    }
  }

  public async findAll(): Promise<Customer[] | undefined> {
    return this.customers
  }

  public async findByName(name: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.name === customer.name)
    return customer as Customer | null;
  }

  public async findById(id: number): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.id === customer.id)
    return customer as Customer | null;
  }

  public async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.email === customer.email)
    return customer as Customer | null;
  }

  public async findAndCount(pagination: Pagination): Promise<[ICustomer[], number]> {
    throw new Error('Method not implemented.');
  }
}