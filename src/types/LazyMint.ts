export interface ILazyMintData {
  contract: string
  creators?: Array<{
    account: string
    value: string
  }>
  royalties?: []
  signatures: Array<string>
  tokenId: string
  uri: string
}
