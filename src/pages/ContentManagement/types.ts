export type INFTCard = {
  url: string
  name: string
}

export type IWorksRow = {
  id: number
  name: string
  creator: string
  owner: string
  isActive: boolean
  pictureURL: string
}

export type IUsersRow = {
  id: number
  firstname: string
  lastname: string
  username: string
  isActive: boolean
  avatar: string
}

export type IRowsPerPageType = 10 | 25 | 50 | 100
