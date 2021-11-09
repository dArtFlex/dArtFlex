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
  __eth: GenericContractKeys
  __bsc: GenericContractKeys
  __polygon: GenericContractKeys
  __ethRinkeby: GenericContractKeys
  __bscTestnet: GenericContractKeys
}

export type IChaintIdHexFormat = '0x1' | '0x4' | '0x38' | '0x61' | '0x137'
export type IChainIdDecimalsFormat = 1 | 4 | 56 | 97 | 137
export type IChainId = IChaintIdHexFormat & IChainIdDecimalsFormat

export type IUnsupportedChainId = '0x2a' | '0x3' | '0x5'

export type IPaymentToken = 'ETH' | 'WETH' | 'BNB'

export type IChainName = '__eth' | '__bsc' | '__polygon' | '__ethRinkeby' | '__bscTestnet'
