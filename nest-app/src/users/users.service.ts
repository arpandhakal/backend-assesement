import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './userschema/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import axios from 'axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findByEmail(email: string): Promise<any> {
    return this.userModel.find({ email });
  }

  async findAll(name?: string, email?: string): Promise<any> {
    try {
      interface Query {
        name?: string;
        email?: string;
      }
      const query: Query = {};
      if (name) {
        query.name = name;
      }
      if (email) {
        query.email = email;
      }
      return this.userModel.find(query).exec();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      const githubUsername = createUserDto.name;
      const response = await axios.get(
        `https://api.github.com/users/${githubUsername}`,
      );

      const githubUserData = {
        fullname: response.data.name,
        avatar_url: response.data.avatar_url,
      };

      Object.assign(newUser, githubUserData);

      await newUser.save();

      this.eventEmitter.emit('user.created', 'new user created');

      console.log('User created successfully', newUser);

      return newUser;
    } catch (err) {
      console.error('Error creating user:', err.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUser(id: string): Promise<Users> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        console.log('user not found');
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      console.log('user found');
      return user;
    } catch (err) {
      console.error(err.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.userModel.deleteOne({ _id: id }).exec();
      if (user.deletedCount === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      console.log('user deleted');
    } catch (err) {
      console.error(err.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      console.log('user updated');
      return updatedUser;
    } catch (err) {
      console.error(err.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
