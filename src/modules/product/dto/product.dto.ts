import { IsString } from 'class-validator';
import { CategoryModel } from "../../category/models/category.model";
import { BrandModel } from "../../brand/models/brand.models";

export class ProductDto {
  @IsString()
  category: CategoryModel;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  code: string;

  @IsString()
  price: number;

  @IsString()
  tradePrice: number;

  @IsString()
  brand: BrandModel;
}