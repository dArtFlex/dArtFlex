const tokensAll = {
  // Ethereum
  '0x1': [
    {
      id: 'ETH',
      erc20id: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
    {
      name: 'Wrapped Ether',
      id: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      symbol: 'WETH',
      decimals: 18,

      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
  ],

  // Rinkeby
  '0x4': [
    {
      id: 'ETH',
      erc20id: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
    },
    {
      name: 'Wrapped Ether',
      id: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      symbol: 'WETH',
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    },
  ],
}

export default tokensAll
