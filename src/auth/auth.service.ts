import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAuthDto,
  LoginAuthDto,
  RegisterAuthDto,
  ResetPasswordAuthDto,
} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

import { v4 as uuidv4 } from 'uuid';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResetPassword } from './entities/auth.entity';
import { MailService } from 'src/mailer/mailer.service';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    @InjectRepository(Customer) private customerModel: Repository<Customer>,
    @InjectRepository(ResetPassword)
    private resetPasswordModel: Repository<ResetPassword>,
    private jwtService: JwtService,
    private mailerService: MailService,
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
        const payload = {
          sub: validUser.id,
          username: validUser.username,
          role: validUser.role,
        };
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

  async userRegsiter(registerDto: RegisterAuthDto) {
    try {
      const { email, contact } = registerDto;

      // check if user already exists
      const existingUser = await this.userModel.findOne({
        where: [{ email }, { contact }],
      });
      const count = await this.userModel.count();

      if (existingUser) {
        throw new Error('Email or contact already exists.');
      }

      // Generate Salt
      const salt = await bcrypt.genSalt();

      // Hash Password
      const hash = await bcrypt.hash(registerDto.password, salt);

      // add Hash Password
      registerDto.password = hash;
      registerDto.username = `${registerDto.fullName.slice(0, 4)}uGs${
        count + 1
      }`;

      const registerUser: User | undefined = this.userModel.create(registerDto);
      await this.userModel.save(registerUser);

      const payload = {
        sub: registerUser.id,
        username: registerUser.username,
        role: registerUser.role,
      };

      const accessToken = await this.jwtService.signAsync(payload);

      return {
        status: 200,
        message: 'User registration successful',
        data: { userData: registerUser, accessToken },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async sendPasswordResetEmail(resetPassworddto: ResetPasswordAuthDto) {
    try {
      const { email } = resetPassworddto;
      let resetPasswordFields = {};
      const isUser = await this.userModel.findOne({ where: { email } });
      if (!isUser) {
        throw new NotFoundException('Email not registered');
      }
      resetPasswordFields = {
        token: `Gs${uuidv4()}${isUser.username}`,
        user: isUser,
      };
      await this.resetPasswordModel.save(resetPasswordFields);
      const response = await this.mailerService.SendResetPasswordMail(
        email,
        resetPasswordFields,
      );
      return { status: 200, message: 'Reset Password page' };
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
