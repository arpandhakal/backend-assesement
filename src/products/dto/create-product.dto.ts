import { IsString,IsNotEmpty } from "class-validator";

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    description :string;

    @IsString()
    @IsNotEmpty()
    price: number;
}
