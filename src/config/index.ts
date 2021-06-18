const APP_CONFIG = {
  services: {
    user: '/user',
  },
  activeWalletStorage: 'active.wallet',
  walletConnectMetaMaskStorage: 'metamask.connect',
  walletConnectTrustStorage: 'trust.connect',
  walletConnect: 'walletconnect',

  baseURL: 'http://3.11.202.153/',
  localURL: 'http://localhost:3000/',

  getUserProfile: (id: number) => `http://dartflex-dev.ml:8888/api/user/get/${id}`,
  getUserProfileByOwner: (owner: string) => `http://dartflex-dev.ml:8888/api/user/get/wallet/${owner}`,
  getItemAll: 'http://dartflex-dev.ml:8888/api/item/get_all',
  getItemByTokenId: (token_id: number) => `http://dartflex-dev.ml:8888/api/item/get_by_token_id/${token_id}`,
  getMetadata: (id: number) => `http://dartflex-dev.ml:8888/api/metadata/get/${id}`,

  uploadImage: 'http://dartflex-dev.ml:8888/api/image/upload',
  createMetadata: 'http://dartflex-dev.ml:8888/api/metadata/create',
  createItem: 'http://dartflex-dev.ml:8888/api/item/create',
  createSalesDetail: 'http://dartflex-dev.ml:8888/api/marketplace/create',
  createOrder: 'http://dartflex-dev.ml:8888/api/order/create',
  bidListItem: 'http://dartflex-dev.ml:8888/api/bid/list_item',

  rinkebyProvider: 'https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899',
  ethereumProvider: 'https://mainnet.infura.io/v3/b55d5c248991487b915a693d9b0b11ad',
} as const

export default APP_CONFIG
