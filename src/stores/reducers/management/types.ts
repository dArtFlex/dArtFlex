import { IBaseManagementWorks, IBaseManagementUsers, IError } from 'types'

export interface ManagementStateType {
  fetching: boolean
  error: IError
  works: IBaseManagementWorks[]
  users: IBaseManagementUsers[]
}
