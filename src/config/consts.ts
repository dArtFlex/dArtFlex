const appConst = {
  SORT_VALUES: {
    ENDING_SOON: 'ending_soon',
    RECENT: 'recently_listed',
    PRICE_LOW_HIGH: 'price_low_high',
    PRICE_HIGH_LOW: 'price_high_low',
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
    UPDATE_ASSETS: 10000, // every 10 second
    UPDATE_BIDS_HISTORY: 1000, // every 1 second
  },

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
    ],
  },

  ACCEPT_COMMUNITY_GUIDELINES: '_aGui',
}

export default appConst
