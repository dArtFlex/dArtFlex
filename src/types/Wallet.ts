export interface IWallet {
  accounts: string[]
  balance: number
  meta: {
    coinAbbr: string
  }
}

type RequiredContractKeys = {
  exchangeV2: string // auction contract
  erc721Rarible: string // lazy mint contract
  erc20TransferProxy: string
}
type GenericContractKeys = RequiredContractKeys & {
  [key: string]: string
}

export type ContractAddresses = {
  eth: GenericContractKeys
  bsc: GenericContractKeys
  polygon: GenericContractKeys
  ethRinkeby: GenericContractKeys
  bscTestnet: GenericContractKeys
}
