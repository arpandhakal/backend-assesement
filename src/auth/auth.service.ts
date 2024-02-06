import { Injectable } from '@nestjs/common';
import { signInDto } from './dto/sigIn-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from 'src/users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly UserModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: signInDto): Promise<any> {
    const { email } = signInDto;
    const user = await this.UserModel.findOne({ email }).exec();

    if (!user) {
      throw Error('No User is found');
    }

    const payload = {
      slug: user?._id,
      email: user?.email,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
