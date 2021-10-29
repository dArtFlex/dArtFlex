import APP_CONFIG from 'config'
import { contractAddress } from 'core/contracts/addresses'
import tokensAll from 'core/tokens'

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
    case '0x1':
      return tokensAll['0x1'].find((t) => t.id === salesTokenContract)?.symbol || 'Non'
    case '0x38':
      return tokensAll['0x38'].find((t) => t.id === salesTokenContract)?.symbol || 'Non'
    case '0x137':
      return tokensAll['0x137'].find((t) => t.id === salesTokenContract)?.symbol || 'Non'
    case '0x4':
      return tokensAll['0x4'].find((t) => t.id === salesTokenContract)?.symbol || 'Non'
    case '0x61':
      return tokensAll['0x61'].find((t) => t.id === salesTokenContract)?.symbol || 'Non'
    default:
      return 'Non'
  }
}

export function getChainKeyByContract(contract: string) {
  switch (contract) {
    case contractAddress.__eth.exchangeV2:
    case contractAddress.__eth.erc721Rarible:
    case contractAddress.__eth.erc20TransferProxy:
      return '0x1'

    case contractAddress.__bsc.exchangeV2:
    case contractAddress.__bsc.erc721Rarible:
    case contractAddress.__bsc.erc20TransferProxy:
      return '0x38'

    case contractAddress.__polygon.exchangeV2:
    case contractAddress.__polygon.erc721Rarible:
    case contractAddress.__polygon.erc20TransferProxy:
      return '0x137'

    case contractAddress.__ethRinkeby.exchangeV2:
    case contractAddress.__ethRinkeby.erc721Rarible:
    case contractAddress.__ethRinkeby.erc20TransferProxy:
      return '0x4'

    case contractAddress.__bscTestnet.exchangeV2:
    case contractAddress.__bscTestnet.erc721Rarible:
    case contractAddress.__bscTestnet.erc20TransferProxy:
      return '0x61'

    default:
      break
  }
}
