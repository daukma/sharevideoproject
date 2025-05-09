import { IBase } from './Base.interface'

export interface IVideo extends IBase {
  title?: string
  description?: string
  userId: any
  hastags?: string[]
  thumbnail: string
  videoUrl: string
  like: string[]
  public: 'public' | 'private'
}
