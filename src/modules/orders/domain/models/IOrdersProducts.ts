import { IProduct } from "@modules/products/domain/models/IProduct";
import { IOrder } from "./IOrder";

export interface IOrdersProducts {
  id: number;
  order: IOrder;
  order_id: string;
  product: IProduct;
  product_id: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}