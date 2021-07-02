//@ts-nocheck
import { AssetDataTypes, AssetMarketplaceTypes, AssetStatus } from 'types'

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

// todo:
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
}: Omit<
  AssetMarketplaceTypes,
  'item_id' & 'id' & 'platform_fee' & 'sales_token_contract' & 'end_time' & 'start_time'
> & { start_time: Date | string; end_time: Date | string }): AssetStatus | undefined {
  if (type !== 'auction' && type !== 'instant_buy') {
    throw new Error(`Insufficient type: ${type}`)
  }

  const now_time = new Date()
  if (type === 'instant_buy') {
    return 'buy_now'
  } else if (type === 'auction') {
    if (new Date(end_time).getTime() < now_time.getTime() + 1000 * 60 * 60 * 24) {
      return 'reserve_not_met'
    }
    return 'auction'
  } else if (sold) {
    return 'sold'
  }
}
