import { STEPS_NFT } from './index'
import { MintingStateType } from 'stores/reducers/minting/types'

const { UPLOAD_FILE, UPLOADING, FILL_FORM, MINT_NFT, MINTING, MINTED, LISTED } = STEPS_NFT

export type IStepNFT =
  | typeof UPLOAD_FILE
  | typeof UPLOADING
  | typeof FILL_FORM
  | typeof MINT_NFT
  | typeof MINTING
  | typeof MINTED
  | typeof LISTED

export interface ICreateNFT {
  file: MintingStateType['file']
  name: MintingStateType['data']['name']
  royalties: MintingStateType['data']['royalties']
  description: MintingStateType['data']['description']
  step: IStepNFT
}
