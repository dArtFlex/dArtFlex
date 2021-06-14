import { AdditionalEntities, AssetDataTypes } from 'types'

export function createDummyAssetData(index: number): AdditionalEntities {
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
        _status: 'buy_now',
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
export function getPriceLable(asset: Pick<AssetDataTypes, '_status' | '_currentBit'>) {
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
