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

  // GET All
  getItemAll: 'http://dartflex-dev.ml:8888/api/item/get_all',
  getMarketplaceAll: 'http://dartflex-dev.ml:8888/api/marketplace/get_all',

  // GET User
  getUserProfileByUserId: (id: number) => `http://dartflex-dev.ml:8888/api/user/get/${id}`,
  getUserProfileByOwner: (owner: string) => `http://dartflex-dev.ml:8888/api/user/get/wallet/${owner}`,
  getUserByWallet: (wallet: string) => `http://dartflex-dev.ml:8888/api/user/get/wallet/${wallet}`,

  // GET Asset
  getItemByTokenId: (token_id: number) => `http://dartflex-dev.ml:8888/api/item/get_by_token_id/${token_id}`,
  getItemByItemId: (id: number) => `http://dartflex-dev.ml:8888/api/item/get/${id}`,
  getMetadata: (id: number) => `http://dartflex-dev.ml:8888/api/metadata/get/${id}`,
  getMarketplaceItemById: (item_id: number) => `http://dartflex-dev.ml:8888/api/marketplace/get/${item_id}`,
  getHistory: (market_id: number) => `http://dartflex-dev.ml:8888/api/bid/get_by_market/${market_id}`,

  // POST
  uploadImage: 'http://dartflex-dev.ml:8888/api/image/upload',
  createMetadata: 'http://dartflex-dev.ml:8888/api/metadata/create',
  createItem: 'http://dartflex-dev.ml:8888/api/item/create',
  createSalesDetail: 'http://dartflex-dev.ml:8888/api/marketplace/create',
  createOrder: 'http://dartflex-dev.ml:8888/api/order/create',
  bidListItem: 'http://dartflex-dev.ml:8888/api/bid/list_item',
  placeBid: 'http://dartflex-dev.ml:8888/api/bid/place_bid',
  acceptBid: 'http://dartflex-dev.ml:8888/api/bid/accept_bid',

  rinkebyProvider: 'http://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899',
  ethereumProvider: 'http://mainnet.infura.io/v3/b55d5c248991487b915a693d9b0b11ad',
} as const

export default APP_CONFIG
