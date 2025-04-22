import { IBase } from './Base.interface'

export interface IUser extends IBase {
  username: string
  password: string
  name: string
  profile: string
  address?: string
  dob?: Date
  phone?: string
  roles: string
}
