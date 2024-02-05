import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RealtimeModule } from './realtime/realtime.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot('your mongoDb link'),
    RealtimeModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
