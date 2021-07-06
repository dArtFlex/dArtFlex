import axios, { AxiosError, AxiosResponse } from 'axios'
import { defaults, isObject, isEmpty } from 'lodash'
import { IApiMiddleware } from './types'

const { REACT_APP_BASE_URL: baseURL } = process.env

export default function apiMiddleware({
  url = '/',
  method = 'GET',
  data = {},
  headers = {},
  transform = true,
}: IApiMiddleware): Promise<string> {
  defaults(headers, {
    Accept: 'application/json; charset=UTF-8',
    'Content-Type': 'application/json; charset=UTF-8',
    'Content-Language': localStorage.getItem('i18nextLng') || 'en',
    'Access-Control-Allow-Origin': '*',
    // Authorization: `Bearer ${localStorage.getItem('token')}`,
  })

  return axios({
    baseURL,
    method,
    url,
    headers,
    params: method === 'GET' && isObject(data) && !isEmpty(data) ? data : {},
    data: transform ? JSON.stringify(data) : data,
  })
    .then((resp: AxiosResponse) => {
      if (!!resp?.data?.error) {
        const message = resp.data.error
        const error: Error = new Error(message)
        error.message = message || ''
        throw error
      }

      if (resp.status >= 400 || resp.status === 500) {
        throw new Error(resp.data)
      }

      return resp.data
    })
    .catch((er: AxiosError) => {
      const _error = er?.response?.data?.error || er?.message
      // const isToken = localStorage.getItem('token')

      if (!!er.message) {
        const error = new Error(_error)
        error.message = _error
        throw error
      }
    })
}
