import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  category: string;

  @Column()
  subCategory: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  offer_price: number;

  @Column({ default: true })
  status: Boolean;

  @Column()
  images: [];
}
