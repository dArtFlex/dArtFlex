const APP_CONFIG = {
  services: {
    user: '/user',
  },
  activeWalletStorage: 'active.wallet',
  walletConnectMetaMaskStorage: 'metamask.connect',
  walletConnectTrustStorage: 'trust.connect',
  walletConnect: 'walletconnect',

  baseURL: 'https://3.11.202.153/',
  localURL: 'https://localhost:3000/',

  // GET All
  getItemAll: 'https://dartflex-dev.ml:8888/api/item/get_all',
  getMarketplaceAll: 'https://dartflex-dev.ml:8888/api/marketplace/get_all',

  // GET User
  getUserProfile: (id: number) => `https://dartflex-dev.ml:8888/api/user/get/${id}`,
  getUserProfileByOwner: (owner: string) => `https://dartflex-dev.ml:8888/api/user/get/wallet/${owner}`,
  getUserByWallet: (wallet: string) => `https://dartflex-dev.ml:8888/api/user/get/wallet/${wallet}`,

  // GET Asset
  getItemByTokenId: (token_id: number) => `https://dartflex-dev.ml:8888/api/item/get_by_token_id/${token_id}`,
  getItemByItemId: (id: number) => `https://dartflex-dev.ml:8888/api/item/get/${id}`,
  getMetadata: (id: number) => `https://dartflex-dev.ml:8888/api/metadata/get/${id}`,
  getMarketplaceItemById: (item_id: number) => `https://dartflex-dev.ml:8888/api/marketplace/get/${item_id}`,

  uploadImage: 'https://dartflex-dev.ml:8888/api/image/upload',
  createMetadata: 'https://dartflex-dev.ml:8888/api/metadata/create',
  createItem: 'https://dartflex-dev.ml:8888/api/item/create',
  createSalesDetail: 'https://dartflex-dev.ml:8888/api/marketplace/create',
  createOrder: 'https://dartflex-dev.ml:8888/api/order/create',
  bidListItem: 'https://dartflex-dev.ml:8888/api/bid/list_item',

  rinkebyProvider: 'https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899',
  ethereumProvider: 'https://mainnet.infura.io/v3/b55d5c248991487b915a693d9b0b11ad',
} as const

export default APP_CONFIG
