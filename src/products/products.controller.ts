import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/Guards/roles.decorator';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/all')
  findAll() {
    return this.productsService.findAll();
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteProduct(@Query('id') id?: string) {
    return this.productsService.deleteProduct(id);
  }

  @Patch('/update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateProduct(
    @Query('id') id?: string,
    @Body() updateProductDto?: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }
}
