import { IUseCardStatus } from 'common/Card/CardAsset/types'
import appConst from 'config/consts'
const {
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD, FEATURED_ARTWORKS },
  TYPES: { INSTANT_BY, AUCTION },
} = appConst

export function useCardStatus({ status, endPrice, startPrice, sold, endTime }: IUseCardStatus) {
  return 'action'
}
