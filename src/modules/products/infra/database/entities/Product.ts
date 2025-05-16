import { OrdersProducts } from '@modules/orders/infra/database/entities/OrdersProducts';
import { IProduct } from '@modules/products/domain/models/IProduct';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
