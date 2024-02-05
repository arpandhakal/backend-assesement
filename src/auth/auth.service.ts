import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from 'src/users/Schemas/users.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,

    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    try {
      const user = await this.userModel.findOne({ email });
      console.log(user);

      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new NotAcceptableException(
          'Could not find username and password',
        );
      }

      const payload = {
        sub: user._id,
        userName: user.name,
        role: user.role,
      };
      console.log(payload);

      if (isMatch) {
        console.log('successfully logged in');
        return {
          access_token: this.jwtService.sign(payload),
          role: payload.role,
        };
      }
    } catch (err) {
      console.log(err);
      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
    }
  }
}
