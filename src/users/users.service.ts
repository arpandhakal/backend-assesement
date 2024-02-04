import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';

interface UserData {
  name: string;
  organization: string;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  //getAllUsers
  async getUsers(name?: string, email?: string, role?: string): Promise<any> {
    try {
      interface Query {
        name?: string;
        email?: string;
        role?: string;
      }
      const query: Query = {};
      if (name) {
        query.name = name;
      }
      if (email) {
        query.email = email;
      }
      if (role) {
        query.role = role;
      }

      const result = await this.userModel.find(query).exec();
      return result;
    } catch (error) {
      throw new HttpException(
        'Could not handle request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //getUserById
  async getUsersById(id: string): Promise<any> {
    try {
      const parseId = new Types.ObjectId(id);
      const result = await this.userModel.findById(parseId).exec();
      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  //Post User or Create User
  async createUser(dto: CreateUserDto) {
    try {
      const result = await this.userModel.create(dto);
      // const newObj = { date: Date.now(), ...result };
      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  //Delete user by ID
  async deleteUser(id: string): Promise<any> {
    try {
      const parseId = new Types.ObjectId(id);
      const result = await this.userModel.findByIdAndDelete(parseId).exec();
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //Update UserBy ID
  async updateUser(id: string): Promise<any> {
    try {
      const parseId = new Types.ObjectId(id);
      const result = await this.userModel.findOneAndUpdate(parseId).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
