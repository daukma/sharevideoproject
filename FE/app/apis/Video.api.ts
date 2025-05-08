import { Method, request } from '../helper/request.helper'

interface IParams {
  limit?: number
  page?: number
  search?: string
}

export class VideoAPI {
  static readonly COMPONENT_NAME: string = 'videos'

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
}
