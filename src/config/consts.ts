const appConst = {
  SORT_VALUES: {
    ENDING_SOON: 'ending_soon',
    RECENT: 'recently_listed',
    PRICE_LOW_HIGH: 'high_to_low',
    PRICE_HIGH_LOW: 'low_to_high',
  },
  FILTER_VALUES: {
    LIVE_AUCTION: 'auction',
    BUY_NOW: 'instant_buy',
    RESERVE_NOT_MET: 'reserve_not_met',
    FEATURED_ARTWORKS: 'featured_artworks',
    IN_WALLET: 'in_wallet',
    CREATED: 'created',
    COLLECTED: 'collected',
    SOLD: 'sold',
    OWNED: 'owned',
    PLACED_BID: 'placed_bid',
    MINTED: 'minted',
    LISTED: 'listed',
    TRANSFERRED: 'transferred',
    CANCELED_BID: 'canceled_bid',
  },
  TYPES: {
    INSTANT_BY: 'instant_buy',
    AUCTION: 'auction',
  },
  STATUSES: {
    MINTED: 'minted',
    LISTED: 'listed',
    UNLISTED: 'unlisted',
    ON_SALE: 'on_sale',
    PURCHASED: 'purchased',
    SOLD: 'sold',
    CLAIMING: 'claiming',
  },
  SCHEDULE: {
    DAYS3: '3days',
    DAYS5: '5days',
    WEEK: 'week',
    MONTH: 'month',
    SPECIFIC: 'specific',
    NEVER: 'never',
  },
  INTERVALS: {
    UPDATE_ASSETS: 20000, // every 20 second
    UPDATE_BIDS_HISTORY: 5000, // every 5 seconds
  },
  ASSETS_PRE_LOAD: 20,

  ACTIVE_WALLET_STORAGE: 'active.wallet',
  WALLET_CONNECT_STORAGE: {
    METAMASK: 'metamask.connect',
  },
  WALLET_CONNECT: 'walletconnect',

  APPROVE_AMOUNT: '900000000000000000000000000000000000000000000000000000000000000',

  USER: {
    ROLES: {
      ROLE_SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
      ROLE_COMMON: 'ROLE_COMMON',
    },
    SECRET_KEYS: [
      '0x5c763f9C2111a61e154d0A05a526E332c12957CE',
      '0xC8B41dEcb99FDadb63b90F6E3BEB5DfE9B2E693c',
      '0x00418a685a1368CD69aDECAb675E310877222509',
      '0x9d5ef64d820f2b4bff570f9067d8dc0c1197b7d4',
      '0xA1Be04719e2d59e327474fcDbe9c8DEcc1958F7B',
    ],
    // AI: ['nft', 'BFZq02m1ps'],
    BLACK_LIST: ['0x45546c0D0C5e94A7EA978862D6bA985e8EDaFb94', '0x49a4C27EB3FD892557BaA884909195a8C80ffcC6'],
  },

  ACCEPT_COMMUNITY_GUIDELINES: '_aGui',
}

export default appConst

export const FORMATS: { [index: string]: string[] } = {
  image: ['.jpg', '.gif', '.png', '.jpeg'],
  // image: ['.jpg', '.jpeg', '.gif', '.png', '.tiff', '.heic', '.hevc', '.heif', '.tif'],
  // video: ['.mp4', '.mov', '.flv', '.avi', '.webm', '.mkv', '.wmv', '.mts'],
  // audio: ['.mp3', '.wav'],
  // doc: ['.doc', '.docx'],
  // excel: ['.xls', '.xlsx'],
  // ppt: ['.ppt', '.pptx'],
  // pdf: ['.pdf'],
  // txt: ['.txt'],
  // odt: ['.odt'],
  // csv: ['.csv'],
  // archive: ['.rar', '.zip', '.7z', '.gz', '.bz2', '.tar'],
  // folder: ['folder'],
}
