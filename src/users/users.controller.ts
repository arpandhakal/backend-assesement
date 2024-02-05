import { Body, Controller, Delete, Get,Patch, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/allUsers')
  getall(
    @Query('name')name?:string,
    @Query('email')email?:string,
    @Query('role')role?:string,
  ){
    return this.usersService.getall(name,email,role);
  }

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.postUser(createUserDto);
}
  @Get('/user/:id')
  async getUserById(@Param('id') userId: string) {
    const result = await this.usersService.getUserById(userId);
    return result;
}

  @Delete('/delete/:id')
  async findByIdAndDelete(@Param('id') id: string) {
    const res = await this.usersService.deleteUserById(id);
    return res;
}
@Patch('/update/:id')
update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
  return this.usersService.updateUserById(id, UpdateUserDto);
}
}


