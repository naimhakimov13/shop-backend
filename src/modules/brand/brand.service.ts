import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";

import { BrandModel } from "./models/brand.models";
import { urlSlug } from "../../utils/generateSlug";

@Injectable()
export class BrandService {
   constructor(@InjectModel(BrandModel) private readonly brandModel: ModelType<BrandModel>) {}

   async create(name: string) {
      return await this.brandModel.create({
         name,
         slug: urlSlug(name)
      });
   }

   async deleteById(id: string) {
      const brand = await this.brandModel.findByIdAndDelete(id).exec();
      if (brand) {
         return null
      }

      throw new NotFoundException('Not found brand')
   }

   async updateById(id: string, name: string) {
      const brand = {name, slug: urlSlug(name)}
      const brandUpdate = await this.brandModel.findByIdAndUpdate(id, brand).exec();
      if (brandUpdate) {
         return await this.brandModel.findById(id).exec();
      }
      throw new NotFoundException('Not found brand')
   }

   async getAll() {
      return await this.brandModel.find().exec();
   }

   async drop() {
      return await this.brandModel.collection.drop();
   }
}
