import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { RealtimeModule } from './realtime/realtime.module';
import { EventsModule } from './events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://shresthaapsara:WrOnGyOu757%40!@cluster0.lwaodds.mongodb.net/products',
    ),
    ProductsModule,
    RealtimeModule,
    EventsModule,
    AuthModule


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
