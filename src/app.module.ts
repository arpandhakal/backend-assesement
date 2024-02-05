import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

import { RealtimeModule } from './realtime/realtime.module';
//import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_GUARD } from '@nestjs/core';
//import { RolesGuard } from './guards/roles.guard';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://sujita:express12@cluster0.5ukuwnd.mongodb.net/Products',
    ),
    ProductsModule,

    RealtimeModule,

    EventEmitterModule.forRoot(),

    AuthModule, //initializes the event emitter and register any declarative event listeners.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
