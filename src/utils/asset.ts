import { AssetMarketplaceTypes, IAssetStatus, AssetTypes } from 'types'
import appConst from 'config/consts'

const {
  TYPES: { INSTANT_BY, AUCTION },
  STATUSES: { MINTED, LISTED, UNLISTED, ON_SALE, PURCHASED, SOLD },
} = appConst

export function getAssetStatus({
  type,
  start_price,
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
