import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ unique: true, required: true, type: String, maxlength: 20 })
  email: string;

  @Prop()
  refreshToken?: string;

  @Prop({
    required: true,
    type: String,
    select: true,
  })
  password: string;
  @Prop({ type: String, maxlength: 50 })
  firstName: string;
  @Prop({ type: String, maxlength: 50 })
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});
UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});
