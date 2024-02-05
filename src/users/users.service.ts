//import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './userschema/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Res,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update.dto';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { error } from 'console';
import { EventsService } from 'src/events/events.service';
import { RealtimeService } from 'src/realtime/realtime.service';



@Injectable()
export class UsersService {
 
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    private readonly eventsService: EventsService,
    private readonly realTimeService: RealtimeService,

) {}

  async findOne(username: string): Promise<Users | null> {
    try {
      return await this.userModel.findOne({ name: username }).exec() || null;
    } catch (err) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Users[]> {
    return this.userModel.find().exec();
  }

  async postUser(createUserDto: CreateUserDto) {
    try {
      const newUser = new this.userModel(createUserDto);
      /*const githubData = await axios.get(
        `https://api.github.com/users/${createUserDto.name}`,
      );
      console.log(githubData)*/
      const saltOrRounds = 10;
      const password = newUser.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      newUser.password = hash;
      const result = await this.userModel.create(newUser);
      console.log(result);
      this.realTimeService.emit('created',result);
      this.eventsService.sendNotification(result.name);
      console.log('User successfully created');
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('message', HttpStatus.BAD_REQUEST,err);
      
    }
  }
  
  
  async getUserById(id: string) {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const result = await this.userModel.findById(objectId).exec();
      console.log('User successfully Found');
      return result;
    } catch (err) {
      console.log('User Not found');
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }
  async getall(name?:string,role?:string,email?:string){
    try {
      interface Query{
        name?:string;
        email?:String;
        role?:string;
      }
      const query:Query={};
      if (name){
        query.name = name;
      }
      if (email){
        query.email = email;
      }
      if (role){
        query.role = role;
      }
      
      const result = await this.userModel.find(query).exec();
      console.log(query);
      return result;
  

    } catch (err) {
      console.log('User Not found');
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }

async deleteUserById(id: string) {
    try {
      const result = await this.userModel.findByIdAndDelete(id);
      console.log('User successfully Deleted');
      return result;
    } catch (err) {
      console.log('User Not found');
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    try{
      const result = await this.userModel.findByIdAndUpdate(id, updateUserDto);
      console.log('Updated');
      return result;
    } catch (err) {
      console.log('error updating');
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
  
    }
  }
 
}


