import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { RealtimeService } from 'src/realtime/realtime.service';
import axios from 'axios';
import { EventsService } from 'src/events/events.service';

interface UserData {
  name: string;
  organization: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    // private readonly realTimeService: RealtimeService,
    // private readonly eventsService: EventsService,
  ) {}

  async getUsers(name?: string, email?: string, role?: string): Promise<any> {
    try {
      interface Query {
        name?: string;
        email?: string;
        role?: string;
      }
      const query: Query = {};
      console.log(query);
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
    } catch (err) {
      throw new HttpException(
        'could not handle request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async postUsers(dto: CreateUserDto) {
    try {
      // const githubData: any = await axios.get(
      //   'https://api.github.com/users/${dto.name}',
      // );
      // console.log(githubData);
      // const newDto = {
      //   githubusername: githubData ? githubData.data.login : '-',
      //   githubavatar: githubData ? githubData.data.avatar_url : '-',
      //   ...dto,
      // };
      const result: any = await this.userModel.create(dto);
      // const newObj = { date: Date.now(), ...result };
      // this.realTimeService.emit('created', newObj);
      // this.eventsService.sendNotifucation(result.name);
      // return { message: 'user created' };
      return result
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUsersById(id: string): Promise<any> {
    try {
      const parsedId = new Types.ObjectId(id);
      const result = await this.userModel.findById(parsedId).exec();
      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
