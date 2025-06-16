import { IBase } from './Base.interface'

export interface IUser extends IBase {
  username: string
  password: string
  name: string
  profile: string
  address?: string
  dob?: string
  phone?: string
  roles: string
}
