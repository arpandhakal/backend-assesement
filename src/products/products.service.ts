import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(updateProductDto: UpdateProductDto): Promise<any> {
    try {
      const result = await this.productModel.create(updateProductDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //getAllUsers
  async getProducts(
    productName?: string,
    description?: string,
    productPrice?: string,
  ): Promise<any> {
    try {
      interface Query {
        productName?: string;
        description?: string;
        productPrice?: string;
      }
      const query: Query = {};
      if (productName) {
        query.productName = productName;
      }
      if (description) {
        query.description = description;
      }
      if (productPrice) {
        query.productPrice = productPrice;
      }

      const result = await this.productModel.find(query).exec();
      return result;
    } catch (error) {
      throw new HttpException(
        'Could not handle request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //getUserById
  async getProductsByID(id: string): Promise<any> {
    try {
      const parseId = new Types.ObjectId(id);
      const result = await this.productModel.findById(parseId).exec();
      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  //Delete user by ID
  async deleteProductById(id: string): Promise<any> {
    try {
      const parseId = new Types.ObjectId(id);
      const result = await this.productModel.findByIdAndDelete(parseId).exec();
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel
      .updateOne(
        { _id: id },
        {
          productName: updateProductDto.productName,
          description: updateProductDto.description,
          productPrice: updateProductDto.productPrice,
        },
      )
      .exec();
  }
  async UpdateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.productModel
        .updateOne(
          { _id: id },
          {
            productName: updateProductDto.productName,
            description: updateProductDto.description,
            productPrice: updateProductDto.productPrice,
          },
        )
        .exec();
      return result;
    } catch (error) {
      throw new HttpException(
        'Could not handle request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
