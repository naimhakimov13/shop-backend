import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
   constructor(
      private categoryService: CategoryService
   ) {
   }

   @Get('/')
   async get() {
      return await this.categoryService.get();
   }

   @Post('/')
   async addCategory(@Body() body: CategoryDto) {
      return await this.categoryService.saveCategory(body)
   }

   @Delete(':id')
   async delete(@Param('id') id: string) {
      return await this.categoryService.getById(id)
   }

}
