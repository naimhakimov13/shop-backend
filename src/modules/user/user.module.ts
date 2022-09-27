import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { UserController } from './user.сontroller';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'users',
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
