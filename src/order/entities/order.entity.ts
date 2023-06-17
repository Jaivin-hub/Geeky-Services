import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer: string;

  @Column()
  orderType: string;

  @Column()
  service_name: string;

  @Column()
  assign_to: string;

  @Column()
  price: number;
}
