import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    private jwtService: JwtService,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async adminLOgin(loginAuthDto: LoginAuthDto) {
    try {
      const validUser: User | undefined = await this.userModel.findOne({
        where: {
          email: loginAuthDto.email,
        },
      });
      if (!validUser) throw new NotFoundException('Email not registered');
      const isMatch = await bcrypt.compare(
        loginAuthDto.password,
        validUser.password,
      );
      if (isMatch) {
        const payload = { sub: validUser.id, username: validUser.fullname };
        const accessToken = await this.jwtService.signAsync(payload);
        return {
          status: 200,
          message: 'Admin login successful',
          data: { user: validUser, accessToken },
        };
      } else {
        throw new BadRequestException('Invalid password');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
