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
  lazyMintData?: ILazyMintData
  lazyMintItemId: null | number
  tags: string[]
}

export type IProcess = 'none' | 'in progress' | 'done' | 'failed'
