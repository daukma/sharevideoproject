import { IBase } from './Base.interface'
import { IBaseRes } from './BaseRes.interface'

export interface IAuthReq extends IBase {
  username: string
  password: string
}
interface IAuth {
  accessToken: string
  refreshToken: string
  roles?: string
}
export interface IAuthRes extends IBaseRes<IAuth> {}
