import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create-product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.getProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.getProductsByID(id);
  }

  @Patch('update/:id')
  update(@Param() id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.UpdateProduct(id, updateProductDto);
  }
  @Delete('deleteProduct/:id')
  deleteUser(@Param() id: string): any {
    return this.productService.deleteProductById(id);
  }
}
