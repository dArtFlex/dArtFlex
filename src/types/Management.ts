import { AssetTypes, IImageData, UserDataTypes } from 'types'

export interface IBaseManagementWorks extends AssetTypes {
  imageData: IImageData
  creatorData: UserDataTypes
  ownerData: UserDataTypes
}

export type IBaseManagementUsers = UserDataTypes
