import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard.auth';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/products')
  findAll() {
    return this.productsService.allProducts();
  }

  @Get('/find-product/:id')
  findProduct(@Param('id') id: string) {
    return this.productsService.findProduct(id);
  }

  @Post('/createProduct')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Patch('/update-product/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  updateUser(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete('/delete-product/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles('admin')
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
