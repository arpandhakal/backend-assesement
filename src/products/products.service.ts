import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException,HttpStatus } from '@nestjs/common';
import {Products, ProductDocument } from './productSchema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { RealtimeService } from 'src/realtime/realtime.service';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Products.name) private readonly productModel: Model<ProductDocument>,
        private readonly eventsService: EventsService,
        private readonly realTimeService: RealtimeService,
        ) {}
        async findAllProduct(): Promise<Products[]> {
            return this.productModel.find().exec();
          }
        
          async createProduct(createProductDto:CreateProductDto) {
            try {
              const result = await this.productModel.create(createProductDto);
              this.realTimeService.emit('new product',result);
              this.eventsService.sendNotification(result.name);
              console.log(result);
              console.log('Product successfully created');
              return result;
            } catch (err) {
              throw new HttpException('message', HttpStatus.BAD_REQUEST);
            }
          }

        async deleteProduct(id: string) {
            try {
              const result = await this.productModel.findByIdAndDelete(id);
              console.log('User successfully Deleted');
              return result;
            } catch (err) {
              console.log('User Not found');
              throw new HttpException('message', HttpStatus.BAD_REQUEST);
            }
          }
        
          async updateProduct(id: string, updateProductDto: UpdateProductDto) {
            try{
              const result = await this.productModel.findByIdAndUpdate(id, updateProductDto);
              console.log('Updated');
              return result;
            } catch (err) {
              console.log('error updating');
              throw new HttpException('message', HttpStatus.BAD_REQUEST);
          
            }
          }
}

         
  
        
    


     





