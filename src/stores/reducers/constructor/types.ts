import { IError, IConstructorDataTypes, ICreateStyleTransferEntities } from 'types'

export interface ConstructorStateType extends IConstructorDataTypes {
  fetching: boolean
  fetchingTrandfer: boolean
  error: IError
  transfer?: ICreateStyleTransferEntities
}
