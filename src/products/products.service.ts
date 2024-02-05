import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './ProductSchema/products.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<ProductsDocument>,
  ) {}

  findAll() {
    return this.productModel.find().exec();
  }

  async createProduct(createProductDto: CreateProductDto) {
    try {
      console.log(createProductDto);
      const result = await this.productModel.create(createProductDto);
      console.log('successfully created');
      result.save();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProduct(id: string) {
    try {
      const result = await this.productModel.findByIdAndDelete(id);
      console.log('successfully deleted');
      return result;
    } catch (err) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
      );
    } catch (err) {
      throw new HttpException('message', HttpStatus.BAD_REQUEST);
    }
  }
}
