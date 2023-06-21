import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/constants';
import { ResetPassword } from './entities/auth.entity';
import { MailModule } from 'src/mailer/mailer.module';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ResetPassword, Customer]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    // MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
