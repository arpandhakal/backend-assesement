import { IsEmail, IsEmpty } from 'class-validator';

export class UpdateUserDto {
  name: string;

  @IsEmpty()
  @IsEmail()
  email: string;

  password: string;

  role: string;
}
