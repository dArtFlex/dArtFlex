import { getProviderAddress } from 'utils'

const STAGE_URL_APP = 'https://dartflex-stage.ml'
const STAGE_URL_API = 'https://dartflex-dev.ml:8887/api'
// const STAGE_AI = 'https://api.nft.inga.technology'
const BASE_URL = STAGE_URL_API.replace('/api', '')
const LOCAL_URL = 'http://localhost:3000'

const ETHEREUM_PROVIDER = 'http://mainnet.infura.io/v3/6c7fceaca1a3433dad73cb537f87644b'
const RINKEBY_PROVIDER = 'http://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899'

const APP_CONFIG = {
  ethereumProvider: ETHEREUM_PROVIDER,
  ethereumProviderAddress: getProviderAddress(ETHEREUM_PROVIDER),
  rinkebyProvider: RINKEBY_PROVIDER,
  rinkebyProviderAddress: getProviderAddress(RINKEBY_PROVIDER),
  exchangeRate: (from: string, to: string) => `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`,
  exchangeRateSafe: (symbol: string) => `${STAGE_URL_API}/token_price/get/${symbol.toUpperCase()}`,
  etherscanRinkeby: 'https://rinkeby.etherscan.io',
  etherscanMainnet: 'https://etherscan.io',

  WSUrl: 'wss://dartflex-dev.ml:8887',
  baseURL: `${BASE_URL}`,
  localURL: `${LOCAL_URL}`,
  appUrl: `${STAGE_URL_APP}`,

  // GET All
  getItemAll: `${STAGE_URL_API}/item/get_all`,
  getMarketplaceAll: `${STAGE_URL_API}/marketplace/get_all`,
  getUserAll: `${STAGE_URL_API}/user/getAll`,
  getPromotionAll: `${STAGE_URL_API}/promotion/get_all`,
  getHashtagAll: `${STAGE_URL_API}/hashtag/get_all`,

  // GET User
  getUserProfileByUserId: (id: number) => `${STAGE_URL_API}/user/get/${id}`,
  getUserProfileByOwner: (owner: string) => `${STAGE_URL_API}/user/get/wallet/${owner}`,
  getUserByWallet: (wallet: string) => `${STAGE_URL_API}/user/get/wallet/${wallet}`,
  getUserSalesData: (id: number) => `${STAGE_URL_API}/item/get_salesdata_by_owner/${id}`,

  // GET Asset
  getItemByTokenId: (token_id: number) => `${STAGE_URL_API}/item/get_by_token_id/${token_id}`,
  getItemByItemId: (id: number) => `${STAGE_URL_API}/item/get/${id}`,
  getItemsByOwnerId: (owner_id: number) => `${STAGE_URL_API}/item/get_by_owner/${owner_id}`,
  getItemsByCreatorId: (owner_id: number) => `${STAGE_URL_API}/item/get_by_creator/${owner_id}`,
  getMetadata: (id: number) => `${STAGE_URL_API}/metadata/get/${id}`,
  getMarketplaceItemById: (item_id: number) => `${STAGE_URL_API}/marketplace/get/${item_id}`,
  getOrderByOrderId: (order_id: string) => `${STAGE_URL_API}/order/get/${order_id}`,
  getOrderByItemId: (item_id: string) => `${STAGE_URL_API}/bid/get_offer_by_item/${item_id}`,
  getPurchasedHistoryByUser: (user_id: number) => `${STAGE_URL_API}/activity/get_purchased_history/${user_id}`,
  getSoldHistoryByUser: (user_id: number) => `${STAGE_URL_API}/activity/get_sold_history/${user_id}`,

  // GET History
  getHistoryNFT: (item_id: number) => `${STAGE_URL_API}/activity/get_nft_history/${item_id}`,
  getHistoryTradingByUserId: (user_id: number) => `${STAGE_URL_API}/activity/get_trading_history/${user_id}`,
  getHistory: (market_id: number) => `${STAGE_URL_API}/bid/get_by_market/${market_id}`,
  getHistoryOffers: (item_id: number) => `${STAGE_URL_API}/bid/get_offer_by_item/${item_id}`,
  getBidsByUserId: (user_id: number) => `${STAGE_URL_API}/bid/get_by_user/${user_id}`,
  getActiveUserBidsById: (user_id: number) => `${STAGE_URL_API}/bid/get_active_by_user/${user_id}`,

  // GET Constructor AI
  getGenerateImage: (name: string) => `${STAGE_URL_API}/album/get_temp/${name}`,
  getAlbumByUserId: (user_id: number) => `${STAGE_URL_API}/album/get_by_user/${user_id}`,
  deleteAlbumImageById: (image_id: number) => `${STAGE_URL_API}/album/delete/${image_id}`,

  // POST
  uploadImage: `${STAGE_URL_API}/image/upload`,
  createMetadata: `${STAGE_URL_API}/metadata/create`,
  createItem: `${STAGE_URL_API}/item/create`,
  createSalesDetail: `${STAGE_URL_API}/marketplace/create`,
  createOrder: `${STAGE_URL_API}/order/create`,
  createUserProfile: `${STAGE_URL_API}/user/create`,
  updateUserProfile: `${STAGE_URL_API}/user/update`,
  bidListItem: `${STAGE_URL_API}/bid/list_item`,
  bidUnlistingItem: `${STAGE_URL_API}/bid/unlist_item`,
  makeOffer: `${STAGE_URL_API}/bid/make_offer`,
  placeBid: `${STAGE_URL_API}/bid/place_bid`,
  buy: `${STAGE_URL_API}/bid/buy`,
  acceptBid: `${STAGE_URL_API}/bid/accept_bid`,
  addPromotion: `${STAGE_URL_API}/super_admin/add_promotion`,
  deletePromotion: `${STAGE_URL_API}/super_admin/delete_promotion`,
  createHashtag: `${STAGE_URL_API}/hashtag/create`,
  cancelBid: `${STAGE_URL_API}/bid/withdraw_bid`,
  banUser: `${STAGE_URL_API}/super_admin/ban_user`,
  unbanUser: `${STAGE_URL_API}/super_admin/unban_user`,
  banItem: `${STAGE_URL_API}/super_admin/ban_item`,
  unbanItem: `${STAGE_URL_API}/super_admin/unban_item`,
  userValidation: `${STAGE_URL_API}/user/validate`,
  cancelOffer: `${STAGE_URL_API}/bid/withdraw_offer`,
  acceptOffer: `${STAGE_URL_API}/bid/accept_offer`,
  changePrice: `${STAGE_URL_API}/bid/change_price`,
  constructorStyleTransferSafe: `${STAGE_URL_API}/album/create`,
  addImageToAlbum: `${STAGE_URL_API}/album/save`,
} as const

export default APP_CONFIG
