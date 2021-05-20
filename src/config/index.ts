const APP_CONFIG = {
  services: {
    user: '/user',
  },
  activeWalletStorage: 'active.wallet',
  walletConnectMetaMaskStorage: 'metamask.connect',
  walletConnectTrustStorage: 'trust.connect',

  baseURL: 'http://3.11.202.153/',
  localURL: 'http://localhost:3000/',

  rinkebyProvider: 'https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899',
  ethereumProvider: 'https://mainnet.infura.io/v3/b55d5c248991487b915a693d9b0b11ad',
} as const

export default APP_CONFIG
