import { RoleEnum } from '../role.enum';

export interface UserInterface {
  _id?: string
  username?: string
  email: string
  password: string
  token?: string
  isAdmin?: RoleEnum
}

