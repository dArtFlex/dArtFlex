const BASE_URL = 'http://3.11.202.153:8888/'
// const LOCAL_URL = 'http://localhost:3000/'

const APP_CONFIG = {
  rinkebyProvider: 'http://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899',
  ethereumProvider: 'http://mainnet.infura.io/v3/b55d5c248991487b915a693d9b0b11ad',
  exchangeRate: (from: string, to: string) => `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`,

  // GET All
  getItemAll: `${BASE_URL}api/item/get_all`,
  getMarketplaceAll: `${BASE_URL}api/marketplace/get_all`,

  // GET User
  getUserProfileByUserId: (id: number) => `${BASE_URL}api/user/get/${id}`,
  getUserProfileByOwner: (owner: string) => `${BASE_URL}api/user/get/wallet/${owner}`,
  getUserByWallet: (wallet: string) => `${BASE_URL}api/user/get/wallet/${wallet}`,

  // GET Asset
  getItemByTokenId: (token_id: number) => `${BASE_URL}api/item/get_by_token_id/${token_id}`,
  getItemByItemId: (id: number) => `${BASE_URL}api/item/get/${id}`,
  getMetadata: (id: number) => `${BASE_URL}api/metadata/get/${id}`,
  getMarketplaceItemById: (item_id: number) => `${BASE_URL}api/marketplace/get/${item_id}`,
  getHistory: (market_id: number) => `${BASE_URL}api/bid/get_by_market/${market_id}`,

  // POST
  uploadImage: `${BASE_URL}api/image/upload`,
  createMetadata: `${BASE_URL}api/metadata/create`,
  createItem: `${BASE_URL}api/item/create`,
  createSalesDetail: `${BASE_URL}api/marketplace/create`,
  createOrder: `${BASE_URL}api/order/create`,
  bidListItem: `${BASE_URL}api/bid/list_item`,
  placeBid: `${BASE_URL}api/bid/place_bid`,
  acceptBid: `${BASE_URL}api/bid/accept_bid`,
} as const

export default APP_CONFIG
