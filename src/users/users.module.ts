import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './Schemas/users.schema';
import { RealtimeModule } from 'src/realtime/realtime.module';
import { EventsModule } from 'src/events/events.module';
//import { AuthModule } from 'src/auth/auth.module';
//import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]), //defines which models should be registered in current scope

    RealtimeModule,
    EventsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Make sure to export the service if needed
})
export class UsersModule {}
