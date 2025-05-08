import { IBase } from './Base.interface'

export interface INotification extends IBase {
  notificationType: ['like', 'comment', 'follow', 'mention', 'reply']
  message: String
  userId: any
  videoId?: any
  commentId?: any
  useToId?: any
  isRead: boolean
}
