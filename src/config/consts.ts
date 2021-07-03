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
    UPDATE_ASSETS: 30000, // in 0,5 min
  },
}

export default appConst
