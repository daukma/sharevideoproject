import { Method, request } from '../helper/request.helper'

interface IParams {
  limit?: number
  page?: number
  search?: string
}

export class UserAPI {
  static readonly COMPONENT_NAME: string = 'users'

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

  static deleteUser = (id: string) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`,
    })
  }

  static update = async (id: string, data: FormData) => {
    return request({
      method: Method.PUT, // Sử dụng PUT để cập nhật
      url: `/${this.COMPONENT_NAME}/${id}`, // URL với id người dùng cần cập nhật
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data', // Đảm bảo gửi dữ liệu với content type là 'multipart/form-data' để gửi file
      },
    })
  }
}
