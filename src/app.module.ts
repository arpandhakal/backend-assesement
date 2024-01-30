import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://subekshya4:Subekshya12@cluster0.lskghy8.mongodb.net/products',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
