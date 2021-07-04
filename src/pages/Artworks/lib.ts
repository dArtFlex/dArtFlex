import { IArtworksFiltes } from './types'
import { AssetDataTypesWithStatus } from 'types'
import { IUseCardStatus } from 'common/Card/CardAsset/types'
import appConst from 'config/consts'
import { normalizeDate } from 'utils'
const {
  STATUSES: { LISTED, MINTED },
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD, FEATURED_ARTWORKS },
  TYPES: { INSTANT_BY, AUCTION },
} = appConst

export function useSortedAssets({
  assets,
  filter,
}: {
  assets: AssetDataTypesWithStatus[] | null
  filter: IArtworksFiltes
}) {
  if (assets === null) {
    return assets
  }

  const now_time = new Date().getTime()
  switch (filter) {
    case LIVE_AUCTION:
      return assets.filter(
        (a) => a.type === AUCTION && new Date(a.end_time).getTime() >= now_time && Boolean(a.sold) === false
      )
    case BUY_NOW:
      return assets.filter((a) => a.type === INSTANT_BY && Boolean(a.sold) === false)
    case RESERVE_NOT_MET:
      return assets.filter((a) => {
        debugger
        if (a.type === AUCTION && Boolean(a.sold) === false) {
          return new Date(a.end_time).getTime() < now_time + 1000 * 60 * 60 * 24
        }
        return a.type === BUY_NOW && new Date(a.end_time).getTime() > now_time - 1000 * 60 * 60 * 24
      })
    case SOLD:
      return assets.filter((a) => Boolean(a.sold))
    case FEATURED_ARTWORKS:
      return assets
    default:
      throw new Error(`Insufficient type: ${filter}`)
  }
}

export function useCardStatusLiveAuction({ status, type, endPrice, startPrice, sold, endTime }: IUseCardStatus) {
  switch (status) {
    case LISTED:
      return LIVE_AUCTION
    default:
      return MINTED
  }
}

export function useCardStatusBuyNow({ status, type, endPrice, startPrice, sold, endTime }: IUseCardStatus) {
  switch (status) {
    case LISTED:
      return BUY_NOW
    default:
      return MINTED
  }
}

export function useCardStatusReserveNotMet({ status, type, endPrice, startPrice, sold, endTime }: IUseCardStatus) {
  switch (status) {
    case LISTED:
      const now_time = new Date().getTime()
      if (type === INSTANT_BY && endTime && new Date(endTime).getTime() < now_time + 1000 * 60 * 60 * 24) {
        return RESERVE_NOT_MET
      } else if (type === AUCTION && endTime && new Date(endTime).getTime() <= now_time) {
        return RESERVE_NOT_MET
      }
      return LISTED
    default:
      return MINTED
  }
}

export function useCardStatusSold({ status, type, endPrice, startPrice, sold, endTime }: IUseCardStatus) {
  return SOLD
}

export function useCardStatusFeaturedArtworks({ status, type, endPrice, startPrice, sold, endTime }: IUseCardStatus) {
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
