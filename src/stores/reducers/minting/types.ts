import { ILazyMintData } from 'types'
export interface MintingStateType {
  fetching: boolean
  uploading?: boolean
  minting: IProcess
  error: string
  file: null | File
  data: {
    name: string
    image: string
    image_data: string
    attribute: string
    description: string
    royalties: string
  }
  lazyMintData: null | ILazyMintData
  lazyMintItemId: null | number
}

export type IProcess = 'none' | 'in progress' | 'done' | 'failed'
