import { IBaseManagementWorks, IBaseManagementUsers } from 'types'

export interface ManagementStateType {
  fetching: boolean
  error: string
  works: IBaseManagementWorks[]
  users: IBaseManagementUsers[]
}
