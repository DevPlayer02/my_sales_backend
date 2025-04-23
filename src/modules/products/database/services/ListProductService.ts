import { Product } from "../entities/Product";
import { productsRepositories } from "../repositories/ProductsRepositories";

export default class ListProductService {
  async execute(): Promise<Product[]> {
    const products = await productsRepositories.find();
    return products;
  }
}