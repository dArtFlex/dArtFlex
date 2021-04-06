import { Method } from 'axios'

export interface IApiMiddleware {
  url: string
  method?: Method
  //@ts-ignore
  data?: any
  headers?: Record<string, string>
  transform?: boolean
  noExpirationCheck?: boolean
}

export type IApi = (arg: IApiMiddleware) => Promise<string>
