import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Products>;

@Schema()
export class Products {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

}

export const ProductSchema = SchemaFactory.createForClass(Products);