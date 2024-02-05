import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmail } from 'class-validator';
export class UpdateUserDto {
  name: string;

  email: string;

  role: string;

  password: string;
}
