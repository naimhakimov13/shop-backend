import {
  Body,
  Controller,
  Delete, Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes, ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProduct() {
    return await this.productService.getAll();
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return await this.productService.getBySlug(slug);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        image: {
          type: 'string'
        }
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() product: ProductDto) {
    return await this.productService.saveProduct(file, product);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') productId: string) {
    return await this.productService.deleteProductById(productId)
  }

  @Post('drop')
  async dropCollection() {
    return await this.productService.dropProducts();
  }

}
