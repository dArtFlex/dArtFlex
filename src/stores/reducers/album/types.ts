import { IError, IAlbumEntities } from 'types'

export interface AlbumStateType {
  fetching: boolean
  error: IError
  album: IAlbumEntities[]
  added?: number[]
  success: string
}
