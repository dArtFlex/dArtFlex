import APP_CONSTS from 'config/consts'
import {
  IWallet,
  IChainId,
  IChaintIdHexFormat,
  IBaseTokens,
  IChainName,
  INetworkChains,
  IEthereumChainIds,
  IBinanceChainIds,
  IPolygonChainIds,
  IRinkebyChainIds,
  IBinanceTestnetChainIds,
  IChainIdDecimalsFormat,
} from 'types'
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

export function supportedNetwork(chainId: string | number) {
  // @todo Ethereum chain should be included after realization - 0x1, 1
  const allowedNetworks = [
    INetworkChains.ID_0x4,
    INetworkChains.ID_0x38,
    INetworkChains.ID_0x61,
    INetworkChains.ID_0x137,
    INetworkChains.ID_0x89,
    INetworkChains.ID_4,
    INetworkChains.ID_56,
    INetworkChains.ID_97,
    INetworkChains.ID_137,
  ]
  return allowedNetworks.some((network) => network === chainId)
}

export function networkConvertor(chainId: number): IChaintIdHexFormat | number {
  switch (chainId) {
    case INetworkChains.ID_1:
      return INetworkChains.ID_0x1

    case INetworkChains.ID_4:
      return INetworkChains.ID_0x4

    case INetworkChains.ID_56:
      return INetworkChains.ID_0x38

    case INetworkChains.ID_97:
      return INetworkChains.ID_0x61

    case INetworkChains.ID_137:
      return INetworkChains.ID_0x137
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
    case INetworkChains.ID_1:
      return '__eth'
    case INetworkChains.ID_56:
      return '__bsc'
    case INetworkChains.ID_137:
      return '__polygon'
    case INetworkChains.ID_4:
      return '__ethRinkeby'
    case INetworkChains.ID_97:
      return '__bscTestnet'
    default:
      break
  }
}

export function getChainNameById(chainId: IChainId): IChainName | undefined {
  switch (chainId) {
    case IEthereumChainIds.ID_0x1:
    case IEthereumChainIds.ID_1:
      return '__eth'
    case IBinanceChainIds.ID_0x38:
    case IBinanceChainIds.ID_56:
      return '__bsc'
    case IPolygonChainIds.ID_0x137:
    case IPolygonChainIds.ID_137:
    case IPolygonChainIds.ID_0x89:
      return '__polygon'
    case IRinkebyChainIds.ID_0x4:
    case IRinkebyChainIds.ID_4:
      return '__ethRinkeby'
    case IBinanceTestnetChainIds.ID_0x61:
    case IBinanceTestnetChainIds.ID_97:
      return '__bscTestnet'
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`)
  }
}

export function getChainIdByChainName(chainName: IChainName): IChainIdDecimalsFormat {
  switch (chainName) {
    case '__eth':
      return IEthereumChainIds.ID_1
    case '__bsc':
      return IBinanceChainIds.ID_56
    case '__polygon':
      return IBinanceChainIds.ID_56
    case '__ethRinkeby':
      return IRinkebyChainIds.ID_4
    case '__bscTestnet':
      return IBinanceTestnetChainIds.ID_97
    default:
      throw new Error(`Unsupported chain ID: ${chainName}`)
  }
}
