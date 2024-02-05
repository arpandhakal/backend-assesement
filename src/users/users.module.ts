import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './userschema/user.schema';
import { RealtimeModule } from 'src/realtime/realtime.module';
import { EventsModule } from 'src/events/events.module';


@Module({
  imports:[
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    RealtimeModule,
    EventsModule,
  ],

  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService],
})
export class UsersModule {}






