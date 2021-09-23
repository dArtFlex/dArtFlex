import { IError, IConstructorDataTypes, ICreateStyleTransferEntities, IAlbumEntities } from 'types'

export interface ConstructorStateType extends IConstructorDataTypes {
  fetching: boolean
  cancelled: boolean
  error: IError
  transfer?: ICreateStyleTransferEntities
  imageUrl: string
  album: IAlbumEntities[]
}
