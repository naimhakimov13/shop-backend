import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandModel } from './models/brand.models';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: BrandModel,
        schemaOptions: {
          collection: 'brand',
        },
      },
    ]),
  ],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule {}
