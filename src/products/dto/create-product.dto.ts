import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmail } from 'class-validator';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  price: number;
}
