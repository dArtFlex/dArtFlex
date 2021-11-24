import APP_CONFIG from 'config'
import { contractAddress } from 'core/contracts/addresses'
import tokensAll from 'core/tokens'
import { IChainName, IChainIdDecimalsFormat, INetworkChains } from 'types'
import { networkConvertor } from 'utils'

export function convertChainName(chainName: IChainName) {
  switch (chainName) {
    case '__eth':
      return 'ETH'
    case '__bsc':
      return 'BSC'
    case '__polygon':
      return 'Polygon'
    case '__ethRinkeby':
      return 'ETH Rinkeby'
    case '__bscTestnet':
      return 'BSC Testnet'
  }
}

export function getExplorerScanRootUrl(contract: string): string | undefined {
  switch (contract) {
    case contractAddress.__eth.erc721Rarible:
      return APP_CONFIG.etherscanMainnet

    case contractAddress.__bsc.erc721Rarible:
      return APP_CONFIG.bscscanTestnet

    case contractAddress.__polygon.erc721Rarible:
      return APP_CONFIG.polygonMainnet

    case contractAddress.__ethRinkeby.erc721Rarible:
      return APP_CONFIG.etherscanRinkeby

    case contractAddress.__bscTestnet.erc721Rarible:
      return APP_CONFIG.bscscanTestnet

    default:
      break
  }
}

export function getTokenSymbolByContracts(contract: string, salesTokenContract: string) {
  switch (getChainKeyByContract(contract)) {
    case INetworkChains.ID_0x1:
      return tokensAll[INetworkChains.ID_0x1].find((t) => t.id === salesTokenContract)?.symbol || 'Non'

    case INetworkChains.ID_0x38:
      return tokensAll[INetworkChains.ID_0x38].find((t) => t.id === salesTokenContract)?.symbol || 'Non'

    case INetworkChains.ID_0x137:
      return tokensAll[INetworkChains.ID_0x137].find((t) => t.id === salesTokenContract)?.symbol || 'Non'

    case INetworkChains.ID_0x4:
      return tokensAll[INetworkChains.ID_0x4].find((t) => t.id === salesTokenContract)?.symbol || 'Non'

    case INetworkChains.ID_0x61:
      return tokensAll[INetworkChains.ID_0x61].find((t) => t.id === salesTokenContract)?.symbol || 'Non'
    default:
      return 'Non'
  }
}

export function getChainKeyByContract(contract: string) {
  switch (contract) {
    case contractAddress.__eth.exchangeV2:
    case contractAddress.__eth.erc721Rarible:
    case contractAddress.__eth.erc20TransferProxy:
      return INetworkChains.ID_0x1

    case contractAddress.__bsc.exchangeV2:
    case contractAddress.__bsc.erc721Rarible:
    case contractAddress.__bsc.erc20TransferProxy:
      return INetworkChains.ID_0x38

    case contractAddress.__polygon.exchangeV2:
    case contractAddress.__polygon.erc721Rarible:
    case contractAddress.__polygon.erc20TransferProxy:
      return INetworkChains.ID_0x137

    case contractAddress.__ethRinkeby.exchangeV2:
    case contractAddress.__ethRinkeby.erc721Rarible:
    case contractAddress.__ethRinkeby.erc20TransferProxy:
      return INetworkChains.ID_0x4

    case contractAddress.__bscTestnet.exchangeV2:
    case contractAddress.__bscTestnet.erc721Rarible:
    case contractAddress.__bscTestnet.erc20TransferProxy:
      return INetworkChains.ID_0x61

    default:
      break
  }
}

export function guardChain(contract: string, currentChain: number) {
  return getChainKeyByContract(contract) === networkConvertor(currentChain)
}

export function getNativeTokenByChainId(chainId: IChainIdDecimalsFormat) {
  switch (chainId) {
    case INetworkChains.ID_1:
    case INetworkChains.ID_4:
      return 'ETH'
    case INetworkChains.ID_56:
    case INetworkChains.ID_97:
      return 'BNB'
    case INetworkChains.ID_137:
      return 'MATIC'
    default:
      break
  }
}
