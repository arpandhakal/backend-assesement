import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>; //deals with document related to User

@Schema()
export class Products {
  @Prop() //properties
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
