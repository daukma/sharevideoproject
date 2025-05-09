import { IBase } from './Base.interface'

export interface IComment extends IBase {
  userId?: any
  videoId?: any
  reptoId?: any
  content?: string
}
