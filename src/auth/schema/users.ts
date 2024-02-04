import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>

@Schema({
  timestamps: true,
})
export class Users {
  @Prop()
  user_name: string;
  @Prop({ unique: [true, 'Duplicate email entered'] })
  user_email: string;
  @Prop()
  password: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
