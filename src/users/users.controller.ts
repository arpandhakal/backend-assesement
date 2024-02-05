import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-data.dto';
import { UpdateUserDto } from './dto/update-data.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/Guards/roles.decorator';
//import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // private readonly auth: AuthService;
  @Get('/all')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  getAllUsers(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('role') role?: string,
  ): any {
    return this.usersService.findAll(name, email, role);
  }

  @Post('/create')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.postUser(CreateUserDto);
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async getUserById(@Query('id') id?: string) {
    try {
      const result = await this.usersService.getUserById(id);
      return result;
    } catch (err) {
      throw new HttpException('message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async deleteUserById(@Query('id') id?: string) {
    try {
      const result = await this.usersService.deleteUserById(id);
      return result;
    } catch (err) {
      throw new HttpException('message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async updateUserById(
    @Query('id') id?: string,
    @Body() updateUserDto?: UpdateUserDto,
  ) {
    try {
      const result = await this.usersService.updateUserById(id, updateUserDto);
      return result;
    } catch (err) {
      throw new HttpException('message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
