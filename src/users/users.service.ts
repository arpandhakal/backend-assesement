import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { Model } from 'mongoose';

interface UserData {
  name: string;
  organization: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model <UsersDocument>) {}

  async getUsers(): Promise<any> {
    try {
    //   const responseObject = [
    //     {
    //       name: 'subekshya',
    //       organization: 'wft',
    //     },
    //     {
    //       name: 'Diwas',
    //       organization: 'wft',
    //     },
    //   ];
    const result = await this.userModel.find().exec();
      return result;
    } catch (err) {
      throw new HttpException(
        'could not handle request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
