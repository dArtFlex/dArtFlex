import { AssetDataTypes, AssetMarketplaceTypes, IAssetStatus, AssetTypes, IAssetType } from 'types'
import appConst from 'config/consts'

const {
  TYPES: { INSTANT_BY, AUCTION },
  STATUSES: { MINTED, LISTED, UNLISTED, ON_SALE, PURCHASED, SOLD },
  FILTER_VALUES: { RESERVE_NOT_MET },
} = appConst

export function createDummyAssetData(index: number) {
  const plus1h1m = 1000 * 60 * 60 * 1 + 1000 * 60 * 1
  const plus30m = 1000 * 60 * 60 * 0.5
  const currentDate = new Date().getTime()

  switch (index) {
    case 0:
      return {
        _status: 'auction',
        _priceReserve: 0.1,
        _currentBit: 0.2,
        _expPeriod: currentDate + plus1h1m,
      }
    case 1:
      return {
        _status: 'instant_buy',
        _price: 0.5,
        _expPeriod: currentDate + plus1h1m,
      }
    case 2:
      return {
        _status: 'reserve_not_met',
        _priceReserve: 0.1,
        _expPeriod: currentDate + plus30m,
      }
    case 3:
      return {
        _status: 'reserve_not_met',
        _expPeriod: currentDate + plus30m,
      }
    case 4:
      return {
        _status: 'minted',
      }
    case 5:
      return {
        _status: 'sold',
        _sold: 1,
        _price: 0.5,
        _expPeriod: currentDate + plus30m,
      }
    case 6:
      return {
        _status: 'collected',
      }
    case 7:
      return {
        _status: 'created',
        _priceReserve: 0.1,
      }
    case 8:
      return {
        _status: 'unlisted',
      }
    default:
      return {
        _status: 'reserve_not_met',
        _expPeriod: currentDate + plus1h1m,
      }
  }
}

export function getPriceLable(asset: Pick<AssetDataTypes, 'type'>) {
  switch (asset?.type) {
    case 'auction':
      return 'Current Bid'
    case 'instant_buy':
      return 'Buy Now'
    case 'reserve_price':
      return 'Reserve Price'
    case 'sold':
      return 'Sold for'
  }
}

export function getAssetStatus({
  type,
  start_price,
  end_price,
  start_time,
  end_time,
  sold,
  creator,
  owner,
  isListed,
  userWallet,
}: {
  type: AssetMarketplaceTypes['type']
  start_price: AssetMarketplaceTypes['start_price']
  end_price: AssetMarketplaceTypes['end_price']
  start_time: AssetMarketplaceTypes['start_time']
  end_time: AssetMarketplaceTypes['end_time']
  sold: AssetMarketplaceTypes['sold']
  creator: AssetTypes['creator']
  owner: AssetTypes['owner']
  isListed?: boolean
  userWallet?: string
}): IAssetStatus | undefined {
  if (type !== AUCTION && type !== INSTANT_BY) {
    throw new Error(`Insufficient type: ${type}`)
  }

  const now_time = new Date()
  if (sold) {
    return SOLD
  } else if (isListed === false) {
    if (userWallet === creator && userWallet === owner) {
      return MINTED
    } else if (userWallet !== creator && userWallet === owner) {
      return PURCHASED
    }
  } else if (isListed && new Date(end_time).getTime() < now_time.getTime() && Boolean(start_price) === false) {
    return UNLISTED
  } else if (type === INSTANT_BY || type === AUCTION) {
    if (userWallet === owner) {
      if (creator !== owner && isListed !== undefined) {
        return ON_SALE
      } else if (creator === owner && isListed !== undefined) {
        return LISTED
      }
    }
    return LISTED
  }
}

export function getAssetCartStatus({
  type,
  status,
  start_price,
  end_price,
  start_time,
  end_time,
}: {
  type: IAssetType
  status: IAssetStatus
  start_price: AssetMarketplaceTypes['start_price']
  end_price: AssetMarketplaceTypes['end_price']
  start_time: AssetMarketplaceTypes['start_time']
  end_time: AssetMarketplaceTypes['end_time']
}) {
  const now_time = new Date()

  switch (status) {
    case MINTED:
      return RESERVE_NOT_MET
    case LISTED:
      if (type === AUCTION) {
        if (new Date(end_time).getTime() < now_time.getTime() + 1000 * 60 * 60 * 24) {
          return RESERVE_NOT_MET
        }
      }
      return
  }
}
