import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type ProductDocument = Product & Document;
@Schema()
export class Product {
    @Prop()
    productName: string;

    @Prop()
    description: string;

    @Prop()
    productPrice: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);