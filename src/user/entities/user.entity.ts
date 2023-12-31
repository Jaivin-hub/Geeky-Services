import { ResetPassword } from 'src/auth/entities/auth.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: null })
  profession: string;

  @Column({ default: null })
  avatar: string;

  @Column({ default: null })
  avatarColor: string;

  @Column({ default: null })
  company: string;

  @Column({ default: null })
  country: string;

  @Column({ default: null })
  city: string;

  @Column({ default: null })
  state: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  postalCode: number;

  @OneToMany(() => ResetPassword, (ResetPassword) => ResetPassword.user)
  resetPassword: ResetPassword[];
}
