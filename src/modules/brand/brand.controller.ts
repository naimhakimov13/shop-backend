import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BrandService } from "./brand.service";
import { BrandDto } from "./dto/brand.dto";

@Controller('brand')
export class BrandController {
   constructor(private brandService: BrandService) {
   }

   @Get()
   async getAll() {
      return await this.brandService.getAll();
   }

   @Post()
   @UsePipes(new ValidationPipe())
   async create(@Body() body: BrandDto) {
      return await this.brandService.create(body.name);
   }

   @UsePipes(new ValidationPipe())
   @Post('drop')
   async drop() {
      return await this.brandService.drop();
   }

   @UsePipes(new ValidationPipe())
   @Put(':id')
   async update(@Param('id') id: string, @Body('name') name: string) {
      return await this.brandService.updateById(id, name);
   }

   @UsePipes(new ValidationPipe())
   @Delete(':id')
   async delete(@Param('id') id: string) {
      return await this.brandService.deleteById(id);
   }
}
