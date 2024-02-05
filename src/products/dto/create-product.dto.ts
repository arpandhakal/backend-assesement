import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    productName: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    productPrice: number;
}
