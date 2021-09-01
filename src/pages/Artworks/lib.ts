import BigNumber from 'bignumber.js'
import { AssetDataTypesWithStatus, IHashtag, IArtworksFiltes } from 'types'
import { IUseCardStatus } from 'common/Card/CardAsset/types'
import { UserStateType, IPromotionAsset } from 'stores/reducers/user/types'
import { normalizeDate } from 'utils'
import appConst from 'config/consts'

const {
  STATUSES: { LISTED, MINTED },
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD, FEATURED_ARTWORKS },
  TYPES: { INSTANT_BY, AUCTION },
  SORT_VALUES: { ENDING_SOON, RECENT, PRICE_LOW_HIGH, PRICE_HIGH_LOW },
} = appConst

type IAssetsBaseTypes = Array<AssetDataTypesWithStatus & { hashtag: IHashtag[] }> | null

export function useInnerAssetsFilter({
  assets,
  sortBy,
  price,
  hotOnly,
  activeHashTags,
}: {
  assets: IAssetsBaseTypes
  sortBy: 'ending_soon' | 'recently_listed' | 'price_low_high' | 'price_high_low'
  price: { from: string; to: string }
  hotOnly: boolean
  activeHashTags: string[]
}) {
  if (!assets) {
    return null
  }
  const _assets = assets.filter((asset) => {
    // By Hot
    let isHotOnly
    if (hotOnly) {
      const now_time = new Date().getTime()
      const end_time = normalizeDate(asset.end_time).getTime()
      isHotOnly = end_time > now_time && end_time < now_time + 1000 * 60 * 60
    }

    // By Price
    let isPrice
    const startPrice =
      +asset.current_price > 0
        ? new BigNumber(asset.current_price).dividedBy(`10e${18 - 1}`).toNumber()
        : new BigNumber(asset.start_price).dividedBy(`10e${18 - 1}`).toNumber()
    if ((+price.from > 0 && !+price.to) || (+price.to > 0 && !+price.from)) {
      isPrice = +price.from > 0 ? +price.from <= startPrice : startPrice <= +price.to
    } else if (+price.from > 0 && +price.to > 0) {
      isPrice = +price.from <= startPrice && startPrice <= +price.to
    }

    // By Hashtags
    let isHashtags
    if (activeHashTags.length) {
      isHashtags = asset.hashtag.length
        ? asset.hashtag.some((ht) => activeHashTags.some((aht) => aht === ht.name))
        : false
    }

    // Checking
    let isTrue = true
    if (isHotOnly !== undefined) {
      if (!isHotOnly) {
        return false
      }
      isTrue = isHotOnly
    }
    if (isPrice !== undefined) {
      if (!isPrice) {
        return false
      }
      isTrue = isPrice
    }
    if (isHashtags !== undefined) {
      if (!isHashtags) {
        return false
      }
      isTrue = isHashtags
    }

    return isTrue
  })

  const compare =
    sortBy === ENDING_SOON
      ? compareSortByEndingSoon
      : sortBy === RECENT
      ? compareSortByRecentlyListed
      : sortBy === PRICE_LOW_HIGH
      ? compareSortByLowToHigh
      : sortBy === PRICE_HIGH_LOW
      ? compareSortByHighToLow
      : null

  return compare ? _assets.sort(compare) : _assets
}

function compareSortByEndingSoon(a: AssetDataTypesWithStatus, b: AssetDataTypesWithStatus) {
  const endTimeA = normalizeDate(a.end_time).getTime()
  const endTimeB = normalizeDate(b.end_time).getTime()
  if (endTimeA > endTimeB) {
    return 1
  }
  if (endTimeA < endTimeB) {
    return -1
  }
  return 0
}

function compareSortByRecentlyListed(a: AssetDataTypesWithStatus, b: AssetDataTypesWithStatus) {
  const startTimeA = normalizeDate(a.start_time)
  const startTimeB = normalizeDate(b.start_time)
  // To be clean in sorting we need to put assets with future start times to the end of the sort
  const isCurrentListedTimeA = normalizeDate(a.start_time) <= new Date()
  const isCurrentListedTimeB = normalizeDate(b.start_time) <= new Date()
  if (startTimeA < startTimeB && isCurrentListedTimeA && isCurrentListedTimeB) {
    return 1
  }
  if (startTimeA > startTimeB && !isCurrentListedTimeA && !isCurrentListedTimeB) {
    return -1
  }
  return 0
}

function compareSortByLowToHigh(a: AssetDataTypesWithStatus, b: AssetDataTypesWithStatus) {
  const priceLowToHighA = +a.current_price > 0 ? a.current_price : a.start_price
  const priceLowToHighB = +b.current_price > 0 ? b.current_price : b.start_price
  if (priceLowToHighA > priceLowToHighB) {
    return 1
  }
  if (priceLowToHighA < priceLowToHighB) {
    return -1
  }
  return 0
}

function compareSortByHighToLow(a: AssetDataTypesWithStatus, b: AssetDataTypesWithStatus) {
  const priceHighToLowA = +a.current_price > 0 ? a.current_price : a.start_price
  const priceHighToLowB = +b.current_price > 0 ? b.current_price : b.start_price
  if (priceHighToLowA < priceHighToLowB) {
    return 1
  }
  if (priceHighToLowA > priceHighToLowB) {
    return -1
  }
  return 0
}

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

  assets = assets.filter((asset) => !asset?.ban)

  const now_time = new Date().getTime()
  switch (filter) {
    case LIVE_AUCTION:
      return assets.filter(
        (a) => a.type === AUCTION && normalizeDate(a.end_time).getTime() >= now_time && !Boolean(a.sold)
      )
    case BUY_NOW:
      return assets.filter((a) => a.type === INSTANT_BY && !Boolean(a.sold) && a.status !== 'minted')
    case RESERVE_NOT_MET:
      return assets.filter((a) => {
        if (a.type === AUCTION && !Boolean(a.sold) && !a.isBidded) {
          return normalizeDate(a.end_time).getTime() < now_time + 1000 * 60 * 60 * 24
        }
        return false
      })
    case SOLD:
      return assets.filter((a) => Boolean(a.sold))
    case FEATURED_ARTWORKS:
      return assets
    default:
      throw new Error(`Insufficient type: ${filter}`)
  }
}

export function useCardStatusLiveAuction({ status }: IUseCardStatus) {
  switch (status) {
    case LISTED:
      return LIVE_AUCTION
    default:
      return MINTED
  }
}

export function useCardStatusBuyNow({ status }: IUseCardStatus) {
  switch (status) {
    case LISTED:
      return BUY_NOW
    default:
      return MINTED
  }
}

export function useCardStatusReserveNotMet({ status, type, endTime }: IUseCardStatus) {
  switch (status) {
    case LISTED:
      const now_time = new Date().getTime()
      if (type === INSTANT_BY && endTime && normalizeDate(endTime).getTime() < now_time + 1000 * 60 * 60 * 24) {
        return RESERVE_NOT_MET
      } else if (type === AUCTION && endTime && normalizeDate(endTime).getTime() <= now_time) {
        return RESERVE_NOT_MET
      }
      return LISTED
    default:
      return MINTED
  }
}

export function useCardStatusSold() {
  return SOLD
}

export function useCardStatusFeaturedArtworks({ status, type, endTime }: IUseCardStatus) {
  switch (status) {
    case SOLD:
      return SOLD
    case LISTED:
      const now_time = new Date().getTime()
      if (type === INSTANT_BY && endTime && normalizeDate(endTime).getTime() < now_time + 1000 * 60 * 60 * 24) {
        return RESERVE_NOT_MET
      } else if (type === AUCTION && endTime && normalizeDate(endTime).getTime() <= now_time) {
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

export function usePromotionMultiplyData({
  promotionIds,
  promotionAssets,
}: Pick<UserStateType, 'promotionAssets' | 'promotionIds'>) {
  if (promotionIds.length === 0) {
    return []
  }
  return promotionAssets.map((p: IPromotionAsset) => {
    return {
      id: p.marketData ? Number(p.marketData.item_id) : 0,
      author: {
        id: p.ownerData?.id ? Number(p.ownerData.id) : 0,
        name: p.ownerData?.userid || '',
        profilePhoto: p.ownerData?.profile_image || '',
      },
      name: p?.imageData.name || '',
      bid: p.marketData ? new BigNumber(p.marketData.end_price).dividedBy(`10e${18 - 1}`).toNumber() : 0,
      endDate: p.marketData ? Number(p.marketData.end_time) : 0,
      url: p.imageData.image,
    }
  })
}
