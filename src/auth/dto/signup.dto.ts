import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly user_name: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'Pleased enter correct email' })
  readonly user_email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
