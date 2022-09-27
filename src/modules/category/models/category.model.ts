import { prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface CategoryModel extends Base {}

export class CategoryModel {
  @prop({trim: true, required: true})
  name: string;

  @prop({ unique: true,  })
  slug: string;
}