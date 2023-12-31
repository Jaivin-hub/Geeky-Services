import { ResetPassword } from 'src/auth/entities/auth.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  profile_image: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  state: string;

  @Column({ default: '' })
  city: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  postalCode: number;

  @OneToMany(() => ResetPassword, (ResetPassword) => ResetPassword.customer)
  resetPassword: ResetPassword[];
}
