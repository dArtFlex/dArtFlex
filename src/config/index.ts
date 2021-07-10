// const STAGE_URL = 'https://dartflex-dev.ml:8887/api'
const DEV_URL = 'http://3.11.202.153:8888/api'
// const LOCAL_URL = 'http://localhost:3000/api'

const APP_CONFIG = {
  rinkebyProvider: 'http://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899',
  ethereumProvider: 'http://mainnet.infura.io/v3/b55d5c248991487b915a693d9b0b11ad',
  exchangeRate: (from: string, to: string) => `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`,

  // GET All
  getItemAll: `${DEV_URL}/item/get_all`,
  getMarketplaceAll: `${DEV_URL}/marketplace/get_all`,

  // GET User
  getUserProfileByUserId: (id: number) => `${DEV_URL}/user/get/${id}`,
  getUserProfileByOwner: (owner: string) => `${DEV_URL}/user/get/wallet/${owner}`,
  getUserByWallet: (wallet: string) => `${DEV_URL}/user/get/wallet/${wallet}`,

  // GET Asset
  getItemByTokenId: (token_id: number) => `${DEV_URL}/item/get_by_token_id/${token_id}`,
  getItemByItemId: (id: number) => `${DEV_URL}/item/get/${id}`,
  getMetadata: (id: number) => `${DEV_URL}/metadata/get/${id}`,
  getMarketplaceItemById: (item_id: number) => `${DEV_URL}/marketplace/get/${item_id}`,
  getHistory: (market_id: number) => `${DEV_URL}/bid/get_by_market/${market_id}`,

  // POST
  uploadImage: `${DEV_URL}/image/upload`,
  createMetadata: `${DEV_URL}/metadata/create`,
  createItem: `${DEV_URL}/item/create`,
  createSalesDetail: `${DEV_URL}/marketplace/create`,
  createOrder: `${DEV_URL}/order/create`,
  createUserProfile: `${DEV_URL}/user/create`,
  updateUserProfile: `${DEV_URL}/user/update`,
  bidListItem: `${DEV_URL}/bid/list_item`,
  placeBid: `${DEV_URL}/bid/place_bid`,
  acceptBid: `${DEV_URL}/bid/accept_bid`,
} as const

export default APP_CONFIG
