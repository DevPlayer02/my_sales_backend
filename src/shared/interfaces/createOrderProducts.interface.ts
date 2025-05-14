export interface ICreateOrderProducts {
  products: {
    product_id: string;
    price: number;
    quantity: number;
  }[];
}