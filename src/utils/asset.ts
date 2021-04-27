import { Asset } from 'stores/reducers/assets/types'

export function createDummyAssetData(index: number) {
  const plus1n15 = 1000 * 60 * 60 * 1.15
  const plus30 = 1000 * 60 * 60 * 0.5
  const currentDate = new Date().getTime()

  switch (index) {
    case 0:
      return {
        _status: 'auction',
        _priceReserve: 0.1,
        _currentBit: 0.2,
        _expPeriod: currentDate + plus30,
      }
    case 1:
      return {
        _status: 'buy_now',
        _price: 0.5,
        _expPeriod: currentDate + plus1n15,
      }
    case 2:
      return {
        _status: 'reserve_price',
        _priceReserve: 0.1,
        _expPeriod: currentDate + plus30,
      }
    case 3:
      return {
        _status: 'reserve_price',
        _expPeriod: currentDate + plus30,
      }
    case 4:
      return {
        _status: 'sold',
        _sold: 1,
        _price: 0.5,
        _expPeriod: currentDate + plus30,
      }
    default:
      return {
        _status: 'reserve_price',
        _expPeriod: currentDate + plus30,
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
