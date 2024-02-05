import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create-product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get('/getAll')
  findAll() {
    console.log(this.productsService.getProducts());
    return this.productsService.getProducts();
  }

  @Get('/getProduct/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.getProductsByID(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.UpdateProduct(id, updateProductDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.productsService.deleteProductById(id);
  }
}
