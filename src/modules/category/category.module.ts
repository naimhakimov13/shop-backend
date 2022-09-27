import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { CategoryModel } from './models/category.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CategoryModel,
        schemaOptions: {
          collection: 'category',
        },
      },
    ]),
  ],
  controllers: [
    CategoryController,
  ],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {
}
