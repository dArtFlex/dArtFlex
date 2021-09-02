import { getProviderAddress } from 'utils'

const STAGE_URL = 'https://dartflex-dev.ml:8887/api'
const STAGE_AI = 'https://api.nft.inga.technology'
const BASE_URL = STAGE_URL.replace('/api', '')
const LOCAL_URL = 'http://localhost:3000'

const ETHEREUM_PROVIDER = 'http://mainnet.infura.io/v3/6c7fceaca1a3433dad73cb537f87644b'
const RINKEBY_PROVIDER = 'http://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899'

const APP_CONFIG = {
  ethereumProvider: ETHEREUM_PROVIDER,
  ethereumProviderAddress: getProviderAddress(ETHEREUM_PROVIDER),
  rinkebyProvider: RINKEBY_PROVIDER,
  rinkebyProviderAddress: getProviderAddress(RINKEBY_PROVIDER),
  exchangeRate: (from: string, to: string) => `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`,
  etherscanRinkeby: 'https://rinkeby.etherscan.io',
  etherscanMainnet: 'https://etherscan.io',

  WSUrl: 'wss://dartflex-dev.ml:8887',
  baseURL: `${BASE_URL}`,
  localURL: `${LOCAL_URL}`,

  // GET All
  getItemAll: `${STAGE_URL}/item/get_all`,
  getMarketplaceAll: `${STAGE_URL}/marketplace/get_all`,
  getUserAll: `${STAGE_URL}/user/getAll`,
  getPromotionAll: `${STAGE_URL}/promotion/get_all`,
  getHashtagAll: `${STAGE_URL}/hashtag/get_all`,

  // GET User
  getUserProfileByUserId: (id: number) => `${STAGE_URL}/user/get/${id}`,
  getUserProfileByOwner: (owner: string) => `${STAGE_URL}/user/get/wallet/${owner}`,
  getUserByWallet: (wallet: string) => `${STAGE_URL}/user/get/wallet/${wallet}`,
  getUserSalesData: (id: number) => `${STAGE_URL}/item/get_salesdata_by_owner/${id}`,

  // GET Asset
  getItemByTokenId: (token_id: number) => `${STAGE_URL}/item/get_by_token_id/${token_id}`,
  getItemByItemId: (id: number) => `${STAGE_URL}/item/get/${id}`,
  getItemsByOwnerId: (owner_id: number) => `${STAGE_URL}/item/get_by_owner/${owner_id}`,
  getItemsByCreatorId: (owner_id: number) => `${STAGE_URL}/item/get_by_creator/${owner_id}`,
  getMetadata: (id: number) => `${STAGE_URL}/metadata/get/${id}`,
  getMarketplaceItemById: (item_id: number) => `${STAGE_URL}/marketplace/get/${item_id}`,
  getOrderByOrderId: (order_id: string) => `${STAGE_URL}/order/get/${order_id}`,
  getOrderByItemId: (item_id: string) => `${STAGE_URL}/bid/get_offer_by_item/${item_id}`,
  getPurchasedHistoryByUser: (user_id: number) => `${STAGE_URL}/activity/get_purchased_history/${user_id}`,
  getSoldHistoryByUser: (user_id: number) => `${STAGE_URL}/activity/get_sold_history/${user_id}`,

  // GET History
  getHistoryNFT: (item_id: number) => `${STAGE_URL}/activity/get_nft_history/${item_id}`,
  getHistoryTradingByUserId: (user_id: number) => `${STAGE_URL}/activity/get_trading_history/${user_id}`,
  getHistory: (market_id: number) => `${STAGE_URL}/bid/get_by_market/${market_id}`,
  getHistoryOffers: (item_id: number) => `${STAGE_URL}/bid/get_offer_by_item/${item_id}`,
  getBidsByUserId: (user_id: number) => `${STAGE_URL}/bid/get_by_user/${user_id}`,
  getActiveUserBidsById: (user_id: number) => `${STAGE_URL}/bid/get_active_by_user/${user_id}`,

  // GET Constructor AI
  getTransferStatus: (task_id: string) => `${STAGE_AI}/style_transfer/result/${task_id}/status_only`,

  // POST
  uploadImage: `${STAGE_URL}/image/upload`,
  createMetadata: `${STAGE_URL}/metadata/create`,
  createItem: `${STAGE_URL}/item/create`,
  createSalesDetail: `${STAGE_URL}/marketplace/create`,
  createOrder: `${STAGE_URL}/order/create`,
  createUserProfile: `${STAGE_URL}/user/create`,
  updateUserProfile: `${STAGE_URL}/user/update`,
  bidListItem: `${STAGE_URL}/bid/list_item`,
  bidUnlistingItem: `${STAGE_URL}/bid/unlist_item`,
  makeOffer: `${STAGE_URL}/bid/make_offer`,
  placeBid: `${STAGE_URL}/bid/place_bid`,
  buy: `${STAGE_URL}/bid/buy`,
  acceptBid: `${STAGE_URL}/bid/accept_bid`,
  addPromotion: `${STAGE_URL}/super_admin/add_promotion`,
  deletePromotion: `${STAGE_URL}/super_admin/delete_promotion`,
  createHashtag: `${STAGE_URL}/hashtag/create`,
  cancelBid: `${STAGE_URL}/bid/withdraw_bid`,
  banUser: `${STAGE_URL}/super_admin/ban_user`,
  unbanUser: `${STAGE_URL}/super_admin/unban_user`,
  banItem: `${STAGE_URL}/super_admin/ban_item`,
  unbanItem: `${STAGE_URL}/super_admin/unban_item`,
  userValidation: `${STAGE_URL}/user/validate`,
  cancelOffer: `${STAGE_URL}/bid/withdraw_offer`,
  acceptOffer: `${STAGE_URL}/bid/accept_offer`,
  constructorStyleTransfer: (priority: number, endScale: number) =>
    `${STAGE_AI}/style_transfer?priority=${priority}&end_scale=${endScale}`,
} as const

export default APP_CONFIG
