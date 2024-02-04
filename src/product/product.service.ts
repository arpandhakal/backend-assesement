import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  create(createProductDto: CreateProductDto): Promise<Product> {
    const model = new this.productModel();
    model.productName = createProductDto.productName;
    model.description = createProductDto.description;
    model.productPrice = createProductDto.productPrice;
    return model.save();
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findOne(id:string): Promise<Product> {
    return this.productModel.findById(id).exec();
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

  remove(id:string) {
    return this.productModel.deleteOne({_id:id}).exec();
  }
}
