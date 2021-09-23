import { IDatedEntity, IEntity } from 'types'

export type IConstructorStatus = 'pong' | 'SUCCESS' | 'SENT' | 'PENDING'

export interface IConstructorDataTypes {
  status?: IConstructorStatus
  contentImage: File | null
  styleImage: File | null
  priority: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  endScale: 512 | 1024
}

export interface ICreateStyleTransferEntities {
  result: null
  status: IConstructorStatus
  task_id: string
}

export interface IAlbumEntities extends IDatedEntity, IEntity {
  user_id: number
  image_url: string
}
