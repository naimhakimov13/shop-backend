import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { RoleEnum } from '../role.enum';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {

  @prop({ required: true })
  username: string;

  @prop({ required: true, unique: false })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ default: null })
  photo: string;

  @prop({default: RoleEnum.USER})
  role: RoleEnum
}