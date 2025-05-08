export interface IBaseRes<T> {
  status: boolean
  message: string
  data?: T
}
