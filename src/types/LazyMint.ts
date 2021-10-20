export interface ILazyMintData {
  contract: string
  creators?: Array<{
    account: string
    value: string
  }>
  royalties?: Array<{ account: string; value: string }>
  signatures: Array<string>
  tokenId: string
  uri: string
}

export interface IHashtag {
  id: number
  name: string
  title?: string
  created_at: string
  updated_at: string
}

export interface IHashtagNew {
  inputValue: string
  title: string
}
