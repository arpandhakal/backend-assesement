// import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    // @ApiProperty({example: 'example-Name'})
    name: string;

    @IsNotEmpty()
    @IsEmail()
    // @ApiProperty({example: 'email@email.com'})
    email: string;

    @IsNotEmpty()
    @IsString()
    // @ApiProperty({example: 'normal-user'})
    role: string;

    @IsNotEmpty()
    @IsString()
    // @ApiProperty({example: '@1349567gbf'})
    password: string;
}
