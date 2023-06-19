import { Module } from '@nestjs/common';

import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entities/customer.entity';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    CustomerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql12.freesqldatabase.com',
      port: 3306,
      username: 'sql12626876',
      password: 'ltQF8taPKq',
      database: 'sql12626876',
      entities: [User, Customer],
      synchronize: true,
    }),
    AuthModule,
    // ProductsModule,
    UserModule,
    // OrderModule,
    // ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
