import APP_CONSTS from 'config/consts'
import { IWallet, IChainId, IChaintIdHexFormat, IBaseTokens, IChainName, IChainIdDecimalsFormat } from 'types'
import tokensAll from 'core/tokens'

export function storageActiveWallet(wallet: IWallet, walletStorageKey: string) {
  localStorage.setItem(walletStorageKey, JSON.stringify(wallet))
  localStorage.setItem(APP_CONSTS.ACTIVE_WALLET_STORAGE, walletStorageKey)
}

export function createWalletInstance(accounts: string | string[], balance: number, coinAbbr: string) {
  const combineAccounts = typeof accounts === 'string' ? [accounts] : accounts
  return { accounts: combineAccounts, balance, meta: { coinAbbr } }
}

export function shortCutWallet(account: string) {
  if (account.length < 14) {
    return account
  }
  return `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}`
}

export function parseJS(d: string | null) {
  return d ? JSON.parse(d) : ''
}

export function getWalletsFromHistory() {
  const activeWallet = localStorage.getItem(APP_CONSTS.ACTIVE_WALLET_STORAGE)
  const connectedMetaMask = parseJS(localStorage.getItem(APP_CONSTS.WALLET_CONNECT_STORAGE.METAMASK))
  const connectedWalletConnect = parseJS(localStorage.getItem(APP_CONSTS.WALLET_CONNECT))
  return { activeWallet, connectedMetaMask, connectedWalletConnect }
}

export function supportedChainId(chainId: number) {
  const allowedChainId: IChainIdDecimalsFormat[] = [1, 4, 56, 97, 137]
  return allowedChainId.some((id) => id === chainId)
}

export function supportedNetwork(chainId: string | number) {
  // @todo Ethereum chain should be included after realization - 0x4, 1
  const allowedNetworks = ['0x1', '0x38', '0x61', '0x137', 4, 56, 97, 137]
  return allowedNetworks.some((network) => network === chainId)
}

export function networkConvertor(chainId: number): IChaintIdHexFormat | number {
  switch (chainId) {
    case 1:
      return '0x1'
    case 4:
      return '0x4'
    case 56:
      return '0x38'
    case 97:
      return '0x61'
    case 137:
      return '0x137'
    default:
      return chainId
  }
}

export function getProviderAddress(url: string) {
  const regExp: string | RegExp = new RegExp('(http://mainnet.infura.io/v3/)|(http://rinkeby.infura.io/v3/)', 'i')
  return url.replace(regExp, '')
}

export function getTokenInfoByChainId(chainId: number, erc20TokenId?: string) {
  const convertChainId: IChaintIdHexFormat | number = networkConvertor(chainId)
  return supportedNetwork(convertChainId) && typeof convertChainId !== 'number'
    ? tokensAll[convertChainId].find((t: IBaseTokens) => (erc20TokenId ? t.id === erc20TokenId : t.id === '0x'))
    : undefined
}

export function convertTokenSymbol(symbol: string) {
  switch (symbol.toUpperCase()) {
    case 'WETH':
      return 'ETH'
    case 'WBNB':
      return 'BNB'
    case 'WMATIC':
      return 'MATIC'
    default:
      return symbol
  }
}

export function getChainKeyByChainId(chainId: number): IChainName | undefined {
  switch (chainId) {
    case 1:
      return '__eth'
    case 56:
      return '__bsc'
    case 137:
      return '__polygon'
    case 4:
      return '__ethRinkeby'
    case 97:
      return '__bscTestnet'
    default:
      break
  }
}

export function getChainNameById(chainId: IChainId): IChainName | undefined {
  switch (chainId) {
    case '0x1':
    case 1:
      return '__eth'
    case '0x38':
    case 56:
      return '__bsc'
    case '0x137':
    case 137:
      return '__polygon'
    case '0x4':
    case 4:
      return '__ethRinkeby'
    case '0x61':
    case 97:
      return '__bscTestnet'
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`)
  }
}

export function setGasPriceByChainId(chainId: number) {
  switch (chainId) {
    case 56:
    case 97:
      return '5000000000'
    default:
      return '6000000000'
  }
}

export function setGasPrice(chainId: IChaintIdHexFormat) {
  switch (chainId) {
    case '0x61':
    case '0x38':
      return '10000000000'
    default:
      return '6000000000'
  }
}
