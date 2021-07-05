import { IUseCardStatus } from './types'
import appConst from 'config/consts'
const {
  STATUSES: { LISTED, MINTED },
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD },
  TYPES: { INSTANT_BY, AUCTION },
} = appConst

export function useDefaultCardStatus({ status, type, endTime }: IUseCardStatus) {
  switch (status) {
    case SOLD:
      return SOLD
    case LISTED:
      const now_time = new Date().getTime()
      if (type === INSTANT_BY && endTime && new Date(endTime).getTime() < now_time + 1000 * 60 * 60 * 24) {
        return RESERVE_NOT_MET
      } else if (type === AUCTION && endTime && new Date(endTime).getTime() <= now_time) {
        return RESERVE_NOT_MET
      }
      if (type === AUCTION) {
        return LIVE_AUCTION
      }
      return BUY_NOW
    default:
      return MINTED
  }
}
