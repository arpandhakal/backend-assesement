import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import {
  Product,
  ProductDocument,
} from 'src/products/productschema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async allProducts(): Promise<any> {
    try {
      return this.productModel.find().exec();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = new this.productModel(createProductDto);

      await newProduct.save();

      console.log('product created successfully');

      return newProduct;
    } catch (err) {
      console.error('Error creating product:', err.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        console.log('product not found');
        throw new HttpException('product not found', HttpStatus.NOT_FOUND);
      }
      console.log('user found');
      return product;
    } catch (err) {
      console.error(err.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const user = await this.productModel.deleteOne({ _id: id }).exec();
      if (user.deletedCount === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      console.log('product deleted');
    } catch (err) {
      console.error(err.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .exec();
      if (!updatedProduct) {
        throw new HttpException('product not found', HttpStatus.NOT_FOUND);
      }
      console.log('product updated');
      return updatedProduct;
    } catch (err) {
      console.error(err.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
