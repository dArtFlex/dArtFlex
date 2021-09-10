import { IError, IConstructorDataTypes, ICreateStyleTransferEntities } from 'types'

export interface ConstructorStateType extends IConstructorDataTypes {
  fetching: boolean
  error: IError
  transfer?: ICreateStyleTransferEntities
  imageUrl: string
}
