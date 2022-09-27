import { Injectable, NotFoundException } from '@nestjs/common';
import { FileService } from '../file/file.service';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ProductModel } from './models/product.model';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from 'nestjs-typegoose';
import { urlSlug } from '../../utils/generateSlug';

@Injectable()
export class ProductService {
   constructor(
      @InjectModel(ProductModel) private productModel: ModelType<ProductModel>,
      private readonly fileService: FileService
   ) {
   }

   async saveProduct(file: Express.Multer.File, product: ProductDto): Promise<ProductModel> {
      const image = await this.fileService.saveFile(file);
      if (!image) throw new NotFoundException('Try again please)')
      return await this.productModel.create({
         image: image,
         ...product,
         slug: urlSlug(product.name)
      });
   }

   async deleteProductById(id: string): Promise<ProductModel | null> {
      const product = await this.productModel.findByIdAndDelete(id).exec();
      if (product) {
         return null
      }
      throw new NotFoundException('Not found product')
   }

   async dropProducts(): Promise<boolean> {
      return await this.productModel.collection.drop();
   }

   async getAll(): Promise<ProductModel[]> {
      return await this.productModel.find().populate('category brand').exec();
   }

   async getBySlug(slug: string) {
      return await this.productModel.find({slug}).populate('category subcategory brand').exec();
   }
}
