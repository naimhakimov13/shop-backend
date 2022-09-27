import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CategoryModel } from './models/category.model';
import { urlSlug } from '../../utils/generateSlug';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
   constructor(@InjectModel(CategoryModel) private readonly categoryModel: ModelType<CategoryModel>) {}

   async get(): Promise<DocumentType<CategoryModel>[]> {
      return this.categoryModel.find().limit(10).exec();
   }

   async saveCategory({name}: CategoryDto) {
      const category = {
         name,
         slug: urlSlug(name),
      };
      return await this.categoryModel.create(category);
   }

   async getById(id: string) {
      const category = await this.categoryModel.findByIdAndDelete(id).exec();
      if (category) {
         return null
      }

      throw new NotFoundException('Not found category')
   }
}
