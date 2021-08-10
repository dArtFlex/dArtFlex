import { UserDataTypes, IBaseManagementWorks } from 'types'

export function useFilterByUser(users: UserDataTypes[], search: string) {
  if (!search.length) {
    return users
  }
  return users.filter((user: UserDataTypes) => {
    const match = (value: string) => value.match(new RegExp(search, 'gi')) !== null
    return match(user.fullname) || match(user.wallet) || match(user.userid)
  })
}

export function useFilterByWorks(works: IBaseManagementWorks[], search: string) {
  if (!search.length) {
    return works
  }
  return works.filter((work: IBaseManagementWorks) => {
    const match = (value: string) => value.match(new RegExp(search, 'gi')) !== null
    return match(work.imageData.name) || match(String(work.id))
  })
}
