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
import { Product } from './products/entities/product.entity';
import { ProductImage } from './products/entities/product-image.entity';
import { ResetPassword } from './auth/entities/auth.entity';
import { MailModule } from './mailer/mailer.module';

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
      entities: [User, Customer, Product, ProductImage, ResetPassword],
      synchronize: true,
    }),
    AuthModule,
    MailModule,
    ProductsModule,
    UserModule,
    // OrderModule,
    // ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
