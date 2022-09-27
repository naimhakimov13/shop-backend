import { IsNotEmpty, IsString } from 'class-validator';

export class BrandDto {

   @IsNotEmpty()
   @IsString({message: 'label is string'})
   name: string
}