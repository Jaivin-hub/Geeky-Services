import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async create(createUserDto: Partial<CreateUserDto>) {
    try {
      const { email, contact } = createUserDto;

      // check if user already exists
      const existingUser = await this.userModel.findOne({
        where: [{ email }, { contact }],
      });

      if (existingUser) {
        throw new Error('Email or contact already exists.');
      }

      // Generate Salt
      const salt = await bcrypt.genSalt();

      // Hash Password
      const hash = await bcrypt.hash(createUserDto.password, salt);

      // add Hash Password
      createUserDto.password = hash;

      // Save Register Data to database
      const user = this.userModel.create(createUserDto);
      await this.userModel.save(user);

      return {
        status: 200,
        message: 'User created successfully',
        data: { userData: user },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
