const tokensAll = {
  // Ethereum
  '0x1': [
    {
      id: '0x',
      erc20id: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
      logoURI: '',
    },
    {
      id: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
  ],

  // Rinkeby
  '0x4': [
    {
      id: '0x',
      erc20id: '0xc778417e063141139fce010982780140aa0cd5ab',
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
      logoURI: '',
    },
    {
      name: 'Wrapped Ether',
      id: '0xc778417e063141139fce010982780140aa0cd5ab',
      symbol: 'WETH',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
  ],

  // Binance
  '0x38': [
    {
      id: '0x',
      erc20id: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      symbol: 'BNB',
      name: 'Binance Coin',
      decimals: 18,
      logoURI: '',
    },
    {
      id: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      name: 'Wrapped BNB',
      symbol: 'WBNB',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/logo.png',
    },
  ],

  // Binance Testnet
  '0x61': [
    {
      id: '0x',
      erc20id: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      symbol: 'BNB',
      name: 'Binance Coin',
      decimals: 18,
      logoURI: '',
    },
    {
      id: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      name: 'Wrapped BNB',
      symbol: 'WBNB',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/logo.png',
    },
  ],

  // Polygon
  '0x137': [
    {
      id: '0x',
      erc20id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      symbol: 'MATIC',
      name: 'MATIC',
      decimals: 18,
      logoURI: '',
    },
    {
      id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      name: 'Wrapped MATIC',
      symbol: 'WMATIC',
      decimals: 18,
      logoURI: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=014',
    },
  ],
}

export default tokensAll
