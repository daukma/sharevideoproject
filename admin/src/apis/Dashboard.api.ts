import { Method, request } from '../helper/request.helper'

export class DashboardAPI {
  static readonly COMPONENT_NAME: string = 'dashboard'

  static getUser = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/users`,
      params: {
        filter: {
          order: 'createdAt DESC',
        },
      },
    })
  }

  static getVideo = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/videos`,
      params: {
        filter: {
          order: 'createdAt DESC',
        },
      },
    })
  }
}
