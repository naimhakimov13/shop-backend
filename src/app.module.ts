import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from "./modules/brand/brand.module";


@Module({
   imports: [
      TypegooseModule.forRoot('mongodb://localhost:27017/api'),
      CategoryModule,
      UserModule,
      ProductModule,
      BrandModule
   ],
   controllers: [
      AppController,
   ],
   providers: [
      AppService
   ],
})
export class AppModule {
}
