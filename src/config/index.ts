import { getProviderAddress } from 'utils'

// PROD Instants
const PROD_APP_URL = 'https://dartflex.art'
const PROD_URL_API = 'https://api.dartflex.art/api'
const PROD_WS_URL = 'wss://api.dartflex.art'

// STAGE instants
const STAGE_APP_URL = 'https://dartflex-stage.ml'
const STAGE_URL_API = 'https://dartflex-stage.ml:8887/api'
const STAGE_WS_URL = 'wss://dartflex-stage.ml:8887'

// DEV Instants
const DEV_APP_URL = 'https://dartflex-dev.ml'
const DEV_URL_API = 'https://dartflex-dev.ml:8887/api'
const DEV_WS_URL = 'wss://dartflex-dev.ml:8887'

// LOCAL Instants
const LOCAL_APP_URL = 'http://localhost:3000/'
const LOCAL_URL_API = 'http://localhost:8888/api'
const LOCAL_WS_URL = 'http://localhost:8888'

// ************** SETUP API ENVIRIMENT **************
const API =
  process.env.REACT_APP_STAGE === 'production'
    ? PROD_URL_API
    : process.env.REACT_APP_STAGE === 'stage'
    ? STAGE_URL_API
    : process.env.REACT_APP_STAGE === 'local'
    ? LOCAL_URL_API
    : DEV_URL_API

const APP_URL =
  process.env.REACT_APP_STAGE === 'production'
    ? PROD_APP_URL
    : process.env.REACT_APP_STAGE === 'stage'
    ? STAGE_APP_URL
    : process.env.REACT_APP_STAGE === 'local'
    ? LOCAL_APP_URL
    : DEV_APP_URL

const WS_URL =
  process.env.REACT_APP_STAGE === 'production'
    ? PROD_WS_URL
    : process.env.REACT_APP_STAGE === 'stage'
    ? STAGE_WS_URL
    : process.env.REACT_APP_STAGE === 'local'
    ? LOCAL_WS_URL
    : DEV_WS_URL
// ************** ******************** **************

const BASE_URL = API.replace('/api', '')
const LOCAL_URL = 'http://localhost:3000'

const ETHEREUM_PROVIDER = 'https://mainnet.infura.io/v3/6c7fceaca1a3433dad73cb537f87644b'
const RINKEBY_PROVIDER = 'https://rinkeby.infura.io/v3/2de4d25aeea745b181468b898cf4e899'
const BSC_PROVIDER = 'https://bsc-dataseed.binance.org'
const BSC_TESTNET_PROVIDER = 'https://data-seed-prebsc-1-s1.binance.org:8545'
const POLYGON_PROVIDER = 'https://rpc-mainnet.maticvigil.com'

const APP_CONFIG = {
  // CHAIN PROVIDERS
  __eth: ETHEREUM_PROVIDER,
  __bsc: BSC_PROVIDER,
  __polygon: POLYGON_PROVIDER,
  __ethRinkeby: RINKEBY_PROVIDER,
  __bscTestnet: BSC_TESTNET_PROVIDER,

  ethereumProviderAddress: getProviderAddress(ETHEREUM_PROVIDER),
  rinkebyProviderAddress: getProviderAddress(RINKEBY_PROVIDER),
  bscTestnetProviderAddress: getProviderAddress(BSC_TESTNET_PROVIDER),
  exchangeRate: (from: string, to: string) => `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`,
  exchangeRateSafe: (symbol: string) => `${API}/token_price/get/${symbol.toUpperCase()}`,
  etherscanRinkeby: 'https://rinkeby.etherscan.io',
  etherscanMainnet: 'https://etherscan.io',
  bscscanTestnet: 'https://testnet.bscscan.com',
  bscscanMainnet: 'https://bscscan.com',
  polygonMainnet: 'https://polygonscan.com',

  WSUrl: WS_URL,
  baseURL: `${BASE_URL}`,
  localURL: `${LOCAL_URL}`,
  appUrl: `${APP_URL}`,

  // GET All
  getItemAll_V2: `${API}/item/get`,
  getItemAll: `${API}/item/get_all`,
  getMarketplaceAll: `${API}/marketplace/get_all`,
  getUserAll: `${API}/user/getAll`,
  getPromotionAll: `${API}/promotion/get_all`,
  getHashtagAll: `${API}/hashtag/get_all`,

  // GET User
  getUserProfileByUserId: (id: number) => `${API}/user/get/${id}`,
  getUserProfileByOwner: (owner: string) => `${API}/user/get/wallet/${owner}`,
  getUserByWallet: (wallet: string) => `${API}/user/get/wallet/${wallet}`,
  getUserSalesData: (id: number) => `${API}/item/get_salesdata_by_owner/${id}`,

  // GET Asset
  getItemByTokenId: (token_id: number) => `${API}/item/get_by_token_id/${token_id}`,
  getItemByItemId: (id: number) => `${API}/item/get/${id}`,
  getItemsByOwnerId: (owner_id: number) => `${API}/item/get_by_owner/${owner_id}`,
  getItemsByCreatorId: (owner_id: number) => `${API}/item/get_by_creator/${owner_id}`,
  getItemsByProfile: `${API}/profile/get`,
  getMetadata: (id: number) => `${API}/metadata/get/${id}`,
  getMarketplaceItemById: (item_id: number) => `${API}/marketplace/get/${item_id}`,
  getOrderByOrderId: (order_id: string) => `${API}/order/get/${order_id}`,
  getOrderByItemId: (item_id: string) => `${API}/bid/get_offer_by_item/${item_id}`,
  getPurchasedHistoryByUser: (user_id: number) => `${API}/activity/get_purchased_history/${user_id}`,
  getSoldHistoryByUser: (user_id: number) => `${API}/activity/get_sold_history/${user_id}`,

  // GET History
  getHistoryNFT: (item_id: number) => `${API}/activity/get_nft_history/${item_id}`,
  getHistoryTradingByUserId: (user_id: number) => `${API}/activity/get_trading_history/${user_id}`,
  getHistory: (market_id: number) => `${API}/bid/get_by_market/${market_id}`,
  getHistoryOffers: (item_id: number) => `${API}/bid/get_offer_by_item/${item_id}`,
  getBidsByUserId: (user_id: number) => `${API}/bid/get_by_user/${user_id}`,
  getActiveUserBidsById: (user_id: number) => `${API}/bid/get_active_by_user/${user_id}`,

  // GET Constructor AI
  getGenerateImage: (name: string) => `${API}/album/get_temp/${name}`,
  getAlbumByUserId: (user_id: number) => `${API}/album/get_by_user/${user_id}`,
  deleteAlbumImageById: (image_id: number) => `${API}/album/delete/${image_id}`,

  // POST
  uploadImage: `${API}/image/upload`,
  createMetadata: `${API}/metadata/create`,
  createItem: `${API}/item/create`,
  createSalesDetail: `${API}/marketplace/create`,
  createOrder: `${API}/order/create`,
  createUserProfile: `${API}/user/create`,
  updateUserProfile: `${API}/user/update`,
  bidListItem: `${API}/bid/list_item`,
  bidUnlistingItem: `${API}/bid/unlist_item`,
  makeOffer: `${API}/bid/make_offer`,
  placeBid: `${API}/bid/place_bid`,
  buy: `${API}/bid/buy`,
  acceptBid: `${API}/bid/accept_bid`,
  addPromotion: `${API}/super_admin/add_promotion`,
  deletePromotion: `${API}/super_admin/delete_promotion`,
  createHashtag: `${API}/hashtag/create`,
  cancelBid: `${API}/bid/withdraw_bid`,
  claimBid: `${API}/bid/claim_nft`,
  banUser: `${API}/super_admin/ban_user`,
  unbanUser: `${API}/super_admin/unban_user`,
  banItem: `${API}/super_admin/ban_item`,
  unbanItem: `${API}/super_admin/unban_item`,
  userValidation: `${API}/user/validate`,
  cancelOffer: `${API}/bid/withdraw_offer`,
  acceptOffer: `${API}/bid/accept_offer`,
  changePrice: `${API}/bid/change_price`,
  constructorStyleTransferSafe: `${API}/album/create`,
  addImageToAlbum: `${API}/album/save`,

  link_fatmen: `https://fatmen.dartflex.art/`,
  link_medium: `https://medium.com/dartflex`,
  link_github: `https://github.com/dArtFlex`,
  link_twitter: `https://twitter.com/dartflexart`,
} as const

export default APP_CONFIG
