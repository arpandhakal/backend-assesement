import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>; //deals with document related to User

@Schema()
export class Users {
  @Prop() //properties
  name: string;
  @Prop()
  email: string;
  @Prop()
  role: string;
  @Prop()
  password: string;

  @Prop()
  githubUsername: string;
  @Prop()
  githubAvatar: string;
}

//export type UsersDoc = Users & Document;
export const UsersSchema = SchemaFactory.createForClass(Users);
//supports the creation of schemas for database model
