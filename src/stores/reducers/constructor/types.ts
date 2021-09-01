import { IError, IConstructorDataTypes } from 'types'

export interface ConstructorStateType extends IConstructorDataTypes {
  fetching: boolean
  error: IError
}
