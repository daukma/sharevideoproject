/** @format */

import axios from 'axios'
import { AppConfig } from '../AppConfig'
import { getAuthToken } from './authToken.helper'

export enum Method {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const request = axios.create({
  baseURL: AppConfig.apiUrl,
})

request.interceptors.request.use(
  async (config) => {
    // const token = getToken();
    const accessToken = await getAuthToken()
    const token = 'Bearer ' + accessToken
    if (config.headers && token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => Promise.reject(error),
)
