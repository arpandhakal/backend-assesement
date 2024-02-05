import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/Guard/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Post('/create-product')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
}
   @Get('/allProduct')
   @UseGuards(JwtAuthGuard)
   findAll() {
    return this.productsService.findAllProduct();
}
  @Patch('/update-product/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  return this.productsService.updateProduct(id, updateProductDto);
}

@Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
async findByIdAndDelete(@Param('id') id: string) {
  const res = await this.productsService.deleteProduct(id);
  return res;
}


}




  