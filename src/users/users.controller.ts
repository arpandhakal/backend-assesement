import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { retry } from 'rxjs';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/allUsers')
  getAllUsers(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('role') role?: string,
  ): any {
    return this.usersService.getUsers(name, email, role);
  }

  @Get('/users/:id')
  getUser(@Param() id: string): any {
    return this.usersService.getUsersById(id);
  }

  @Post('/create-user')
  createUser(@Body() createuserDto: CreateUserDto) {
    return this.usersService.createUser(createuserDto);
  }

  @Delete('deleteUser/:id')
  deleteUser(@Param() id: string): any {
    return this.usersService.deleteUser(id);
  }
  // @Patch('/update/:id')
  // updateUser(@Param('id') id:string,@Body() updateUserDto:CreateUserDto){
  //   return this.usersService.updateUser

  // }
}
