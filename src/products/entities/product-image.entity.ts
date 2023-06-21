import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_filename: string;

  @ManyToOne(() => Product, (Product) => Product.images)
  product: Product;
}
