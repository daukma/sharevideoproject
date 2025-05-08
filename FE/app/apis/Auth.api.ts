import axios from 'axios'
import { Method, request } from '../helper/request.helper'
import { IUser } from '../inteface/User.interface'
import { IAuthReq } from './../inteface/Auth.interface'

export class AuthAPI {
  static readonly COMPONENT_NAME: string = 'auth'

  static login = (data: IAuthReq) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/login`,
      data: data,
    })
  }

  static register = async (data: IUser) => {
    return await axios.post('/auth/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  static getProfile = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/me`,
    })
  }
}
