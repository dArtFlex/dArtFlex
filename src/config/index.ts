const STAGE_URL = 'https://dartflex-dev.ml:8887/api'
// const STAGE_URL_OLD = 'http://dartflex-dev.ml:8888/api'
// const DEV_URL = 'https://3.11.202.153:8888/api'

const APP_CONFIG = {
  rinkebyProvider: 'http://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899',
  ethereumProvider: 'http://mainnet.infura.io/v3/b55d5c248991487b915a693d9b0b11ad',
  exchangeRate: (from: string, to: string) => `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`,

  // GET All
  getItemAll: `${STAGE_URL}/item/get_all`,
  getMarketplaceAll: `${STAGE_URL}/marketplace/get_all`,
  getUserAll: `${STAGE_URL}/user/getAll`,
  getPromotionAll: `${STAGE_URL}/promotion/get_all`,

  // GET User
  getUserProfileByUserId: (id: number) => `${STAGE_URL}/user/get/${id}`,
  getUserProfileByOwner: (owner: string) => `${STAGE_URL}/user/get/wallet/${owner}`,
  getUserByWallet: (wallet: string) => `${STAGE_URL}/user/get/wallet/${wallet}`,

  // GET Asset
  getItemByTokenId: (token_id: number) => `${STAGE_URL}/item/get_by_token_id/${token_id}`,
  getItemByItemId: (id: number) => `${STAGE_URL}/item/get/${id}`,
  getItemsByOwnerId: (owner_id: number) => `${STAGE_URL}/item/get_by_owner/${owner_id}`,
  getMetadata: (id: number) => `${STAGE_URL}/metadata/get/${id}`,
  getMarketplaceItemById: (item_id: number) => `${STAGE_URL}/marketplace/get/${item_id}`,
  getHistory: (market_id: number) => `${STAGE_URL}/bid/get_by_market/${market_id}`,
  getHistoryNFT: (item_id: number) => `${STAGE_URL}/activity/get_nft_history/${item_id}`,
  getHistoryTradingByUserId: (user_id: number) => `${STAGE_URL}/activity/get_trading_history/${user_id}`,
  getOrderByOrderId: (order_id: string) => `${STAGE_URL}/order/get/${order_id}`,
  getBidsByUserId: (user_id: number) => `${STAGE_URL}/bid/get_by_user/${user_id}`,

  // POST
  uploadImage: `${STAGE_URL}/image/upload`,
  createMetadata: `${STAGE_URL}/metadata/create`,
  createItem: `${STAGE_URL}/item/create`,
  createSalesDetail: `${STAGE_URL}/marketplace/create`,
  createOrder: `${STAGE_URL}/order/create`,
  createUserProfile: `${STAGE_URL}/user/create`,
  updateUserProfile: `${STAGE_URL}/user/update`,
  bidListItem: `${STAGE_URL}/bid/list_item`,
  placeBid: `${STAGE_URL}/bid/place_bid`,
  buy: `${STAGE_URL}/bid/buy`,
  acceptBid: `${STAGE_URL}/bid/accept_bid`,
  addPromotion: `${STAGE_URL}/super_admin/add_promotion`,
  deletePromotion: `${STAGE_URL}/super_admin/delete_promotion`,
} as const

export default APP_CONFIG
