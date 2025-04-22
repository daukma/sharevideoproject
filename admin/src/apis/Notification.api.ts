import { Method, request } from '../helper/request.helper'
import { INotification } from '../inteface/Notification.inteface'

interface IParams {
  limit?: number
  page?: number
  search?: string
}

export class NotificationAPI {
  static readonly COMPONENT_NAME: string = 'notifications'

  static fetchAll = ({ page, limit, search }: IParams) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          order: 'createdAt DESC',
        },
        limit: limit || 10,
        page: page || 0,
        search: search || '',
      },
    })
  }

  static delete = (id: string) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`,
    })
  }

  static create = (data: INotification) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data: data,
    })
  }
}
