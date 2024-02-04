import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from './schema/user.schema';
import { RealtimeModule } from 'src/realtime/realtime.module';
// import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
    ]),
    RealtimeModule,
    // EventsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
