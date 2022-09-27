import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { sign, verify } from 'jsonwebtoken';

import { UserModel } from './models/user.model';
import { UserDto } from './dto/user.dto';
import { JWT_SECRET } from './config';
import { UserInterface } from './types/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
  ) {
  }

  async register({ email, password, username, role }: UserDto) {
    const salt = await genSalt(10);
    return await this.userModel.create({
      email,
      username,
      password: await hash(password, salt),
      role
    });
  }

  async login({ email, password }: UserInterface) {
    const user = await this.userModel.findOne<UserInterface>({ email });

    if (!user) throw new NotFoundException('Not found user')
    const checkPassword = await compare(password, user.password)

    if (!checkPassword) throw new NotFoundException('Invalid password')

    return user
  }

  checkToken(token: string) {
    try {
      return verify(token, JWT_SECRET)
    } catch (e) {
      throw new NotFoundException('Invalid token')
    }
  }

  async dropUsers() {
    return await this.userModel.collection.drop();
  }

  async getUsers() {
    return await this.userModel.find().exec();
  }

  generateJwt({ username, email, _id }: UserInterface): string {
    return sign(
      {
        _id,
        username,
        email,
      },
      JWT_SECRET,
      { expiresIn: '1d' },
    );
  }

  buildUserResponse(user: UserDto): UserInterface {
    delete user['password']
    return {
      ...user,
      token: this.generateJwt(user),
    };
  }

  /*private async findByEmail(email: string) {
    return !!await this.userModel.findOne({email}).exec()
  }*/
}
