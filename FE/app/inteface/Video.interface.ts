import { IBase } from './Base.interface'

export interface IVideo extends IBase {
  title?: string
  description?: string
  userId: any
  hastags?: Array<string>
  thumbnail: string
  videoUrl: string
  like: Array<string>
  public: 'public' | 'private'
}
