import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

import { CategoryModel } from '../../category/models/category.model';
import { BrandModel } from "../../brand/models/brand.models";

export interface ProductModel extends Base {}

export class ProductModel extends TimeStamps  {

  @prop({ required: true, ref: () => CategoryModel })
  category: Ref<CategoryModel>;

  @prop({ required: true })
  name: string;

  @prop({ required: false, default: null })
  description: string;

  @prop({ required: true, unique: true })
  code: string;

  @prop({unique: true, required: false})
  image?: string;

  @prop({ required: true })
  price: number;

  @prop({ required: true })
  tradePrice: number;

  @prop({ default: null, required: false, ref: () => BrandModel })
  brand: Ref<BrandModel>;

  @prop({unique: true, required: false})
  slug: string
}