import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './userschema/users.schema';
import { RealtimeModule } from 'src/realtime/realtime.module';
import { RealtimeService } from 'src/realtime/realtime.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    RealtimeModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, RealtimeService],
  exports: [UsersService],
})
export class UsersModule {}
