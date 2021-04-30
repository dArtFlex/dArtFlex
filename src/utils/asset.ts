import { Asset } from 'stores/reducers/assets/types'
import appConst from 'config/consts'
const {
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD },
} = appConst

export function createDummyAssetData(index: number) {
  const plus1h1m = 1000 * 60 * 60 * 1 + 1000 * 60 * 1
  const plus30m = 1000 * 60 * 60 * 0.5
  const currentDate = new Date().getTime()

  switch (index) {
    case 0:
      return {
        _status: LIVE_AUCTION,
        _priceReserve: 0.1,
        _currentBit: 0.2,
        _expPeriod: currentDate + plus1h1m,
      }
    case 1:
      return {
        _status: BUY_NOW,
        _price: 0.5,
        _expPeriod: currentDate + plus1h1m,
      }
    case 2:
      return {
        _status: RESERVE_NOT_MET,
        _priceReserve: 0.1,
        _expPeriod: currentDate + plus30m,
      }
    case 3:
      return {
        _status: RESERVE_NOT_MET,
        _expPeriod: currentDate + plus30m,
      }
    case 4:
      return {
        _status: SOLD,
        _sold: 1,
        _price: 0.5,
        _expPeriod: currentDate + plus30m,
      }
    default:
      return {
        _status: RESERVE_NOT_MET,
        _expPeriod: currentDate + plus1h1m,
      }
  }
}

// todo:
export function getPriceLable(asset: Asset) {
  switch (asset?._status) {
    case 'auction':
      return asset?._currentBit ? 'Current Bid' : 'Reserve Price'
    case 'buy_now':
      return 'Buy Now'
    case 'reserve_price':
      return 'Reserve Price'
    case 'sold':
      return 'Sold for'
  }
}
