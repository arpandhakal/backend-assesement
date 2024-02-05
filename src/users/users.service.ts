import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './Schemas/users.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-data.dto';
import { UpdateUserDto } from './dto/update-data.dto';
import { RealtimeService } from 'src/realtime/realtime.service';
import * as bcrypt from 'bcrypt';
import axios from 'axios';

import { EventsService } from 'src/events/events.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    private readonly realTimeService: RealtimeService,
    private readonly eventsService: EventsService,
  ) {}
  async findAll(name?: string, email?: string, role?: string): Promise<any> {
    try {
      interface Query {
        name?: string; //making property optional using ?
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
      console.log(query);

      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }

  async postUser(createUserDto: CreateUserDto) {
    try {
      const newUser = new this.userModel(createUserDto);

      /* const name = newUser.name;
      console.log(name);
      console.log('before githubData');
      const githubData = await axios.get(
        `https://api.github.com/users/${encodeURIComponent(name)}`,
      );
      console.log('after githubData' + githubData);

      const newDto = {
        githubUsername: githubData ? githubData.data.login : '',
        githubAvatar: githubData ? githubData.data.avatar_url : '',
      };
      console.log(newDto);

      Object.assign(newUser, newDto);*/

      const saltOrRounds = 10;

      const password = newUser.password;
      const hash = await bcrypt.hash(password, saltOrRounds);

      newUser.password = hash;

      const result = await this.userModel.create(newUser);
      this.realTimeService.emit('created', result);
      this.eventsService.sendNotification(result.name);

      console.log('User successfully created');
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: string) {
    try {
      const result = await this.userModel.findById(id).exec();
      console.log('User successfully Found');
      return result;
    } catch (err) {
      console.log('User Not found');
      throw new HttpException('UserNotFound', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUserById(id: string) {
    try {
      const result = await this.userModel.findByIdAndDelete(id);
      this.realTimeService.emit('Deleted', result);

      console.log('User successfully Deleted');
      return result;
    } catch (err) {
      console.log('User Not found');
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userModel.findByIdAndUpdate(id, updateUserDto);
      this.realTimeService.emit('Updated', result);
      console.log('User successfully Updated');
      result.save();
      return result;
    } catch (err) {
      console.log('User Not found');
      throw new HttpException('Not Updated', HttpStatus.BAD_REQUEST);
    }
  }

  async login(email: string, pass: string) {
    try {
      const user = await this.userModel.findOne({ email });
      console.log(user);

      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        console.log('successfully logged in');
        return user.name;
      }
    } catch (err) {
      console.log(err);
      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
    }
  }
}
