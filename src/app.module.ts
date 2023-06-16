import { Module } from '@nestjs/common';

import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entities/customer.entity';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    CustomerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'shijin',
      password: 'shijin123',
      database: 'mydatabase',
      entities: [Customer],
      synchronize: true,
    }),
    ProductsModule,
    UserModule,
    OrderModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
