import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString({message: 'label is string,'})
  name: string
}