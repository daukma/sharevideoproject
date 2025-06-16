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

  static create = (formData: FormData) => {
    return request({
      method: Method.POST, // Sử dụng POST để tạo video mới
      url: `/${this.COMPONENT_NAME}/upload`, // Đảm bảo sử dụng đúng endpoint cho việc tạo video
      data: formData, // Gửi dữ liệu FormData chứa video và các trường khác
    })
  }

  static delete = (id: string) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`,
    })
  }
}
