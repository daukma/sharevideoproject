import { IBase } from './Base.interface'

export interface IFollow extends IBase {
  followFromId?: any
  followToId?: any
  status: ['follow', 'unfollow']
}
