import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products,ProductSchema } from './productSchema/product.schema';
import { RealtimeModule } from 'src/realtime/realtime.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
    RealtimeModule,
    EventsModule,
],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}



