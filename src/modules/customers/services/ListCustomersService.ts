import { IPagination } from '@shared/interfaces/pagination.interface';
import { Customer } from '../infra/database/entities/Customer';
import { ICustomersRepositories } from '../domain/repositories/ICustomersRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private readonly customerRepository: ICustomersRepositories) { }
  public async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<IPagination<Customer>> {
    const [data, total] = await this.customerRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      per_page: limit,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
    } as IPagination<Customer>;
  }
}
