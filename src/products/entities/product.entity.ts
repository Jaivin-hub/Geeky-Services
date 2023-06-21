import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_description: string;

  @Column()
  category: string;

  @Column()
  sub_Category: string;

  @Column()
  amount: number;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  offer_price: number;

  @Column({ default: true })
  status: Boolean;

  @OneToMany(() => ProductImage, (ProductImage) => ProductImage.product)
  images: ProductImage[];
}
