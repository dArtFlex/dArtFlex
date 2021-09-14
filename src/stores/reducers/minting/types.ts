import { ILazyMintData, IHashtag, IHashtagNew, IError } from 'types'
export interface MintingStateType {
  fetching: boolean
  uploading?: boolean
  minting: IProcess
  error: IError
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
  hashtags?: Array<IHashtag | IHashtagNew>
  lazymint?: boolean
  src: ISrc
}

export type IProcess = 'none' | 'in progress' | 'done' | 'failed'
export type ISrc = 'local' | 'album'
