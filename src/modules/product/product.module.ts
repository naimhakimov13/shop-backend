import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { FileModule } from '../file/file.module';
import { CategoryModule } from '../category/category.module';
import { FileService } from '../file/file.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductModel } from './models/product.model';
import { BrandModule } from "../brand/brand.module";

@Module({
  controllers: [ProductController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: 'products',
        },
      },
    ]),
    FileModule,
    CategoryModule,
    BrandModule,
  ],
  providers: [ProductService, FileService],
})
export class ProductModule {
}
