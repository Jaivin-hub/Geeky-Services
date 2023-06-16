import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @Column()
  status: Boolean;

  @Column()
  profession: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  postalCode: number;
}
