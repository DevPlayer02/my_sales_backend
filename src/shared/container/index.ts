import { ICustomersRepositories } from "@modules/customers/domain/repositories/ICustomersRepositories";
import customerRepository from "@modules/customers/infra/database/repositories/CustomerRepositories";
import { IOrdersRepositories } from "@modules/orders/domain/repositories/IOrdersRepositories";
import orderRepositories from "@modules/orders/infra/database/repositories/OrderRepositories";
import { IProductsRepositories } from "@modules/products/domain/repositories/IProductsRepositories";
import { productsRepositories } from "@modules/products/infra/database/repositories/ProductsRepositories";
import { IUsersRepositories } from "@modules/users/domain/repositories/IUsersRepositories";
import { IUserTokensRepositories } from "@modules/users/domain/repositories/IUserTokenRepositories";
import usersRepositories from "@modules/users/infra/database/repositories/UsersRepositories";
import { userTokensRepositories } from "@modules/users/infra/database/repositories/UserTokensRepositories";
import { container } from "tsyringe";

container.registerSingleton<ICustomersRepositories>(
  "CustomersRepository",
  customerRepository
)

container.registerSingleton<IOrdersRepositories>(
  "OrdersRepository",
  orderRepositories
)

container.registerSingleton<IProductsRepositories>(
  "ProductsRepository",
  productsRepositories
)
container.registerSingleton<usersRepositories>(
  "UsersRepository",
  usersRepositories
)


container.registerSingleton<IUserTokensRepositories>(
  "UserTokensRepository",
  userTokensRepositories
)