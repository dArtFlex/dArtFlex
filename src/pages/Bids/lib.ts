import { UserStateType, IUserBid } from 'stores/reducers/user/types'
import BigNumber from 'bignumber.js'
import { IAssetType } from 'types'
import appConst from 'config/consts'
import { normalizeDate } from 'utils'

const {
  FILTER_VALUES: { OWNED, LIVE_AUCTION, PLACED_BID },
} = appConst

export function useComposeBidsData({
  userBids,
  userId,
  rateETH,
}: {
  userBids: UserStateType['userBids']
  userId: number
  rateETH: number
}) {
  return userBids.map((bid: IUserBid) => {
    const status = useStatus({
      status: bid.status,
      end_time: bid.marketData.end_time,
      ownerId: bid.ownerData?.id || 0,
      userId,
      bid_amount: bid.bid_amount,
      bid_current: bid.marketData.end_price,
    })

    // When we use only ETH or WETH we know for sure token decimals
    // In this case the same for both is 18
    // If we add some new token to buying system we shold change this logic
    const currentBidAmount = new BigNumber(bid.marketData.end_price)
      .dividedBy(`10e${18 - 1}`)
      .toNumber()
      .toFixed(2)
    const yourBidAmount = new BigNumber(bid.bid_amount)
      .dividedBy(`10e${18 - 1}`)
      .toNumber()
      .toFixed(2)
    const currentBidAmountUsd = new BigNumber(currentBidAmount).multipliedBy(rateETH).toNumber().toFixed(2)
    const yourBidAmountUsd = new BigNumber(yourBidAmount).multipliedBy(rateETH).toNumber().toFixed(2)

    return {
      tokenId: bid.id,
      image: bid.imageData.image,
      name: bid.imageData.name,
      status,
      endDate: bid.marketData.end_time,
      creator: {
        avatar: bid.ownerData?.profile_image || '',
        name: bid.ownerData?.userid || '',
      },
      currentBid: currentBidAmount,
      currentBidUsd: currentBidAmountUsd,
      yourBid: yourBidAmount,
      yourBidUsd: yourBidAmountUsd,
    }
  })
}

interface IUseStatus {
  status: IAssetType
  end_time: string
  ownerId: number
  userId: number
  bid_amount: string
  bid_current: string
}

function useStatus({ status, end_time, ownerId, userId, bid_amount, bid_current }: IUseStatus) {
  const now = new Date().getTime()
  const endTime = normalizeDate(end_time).getTime()
  if (status === LIVE_AUCTION && now < endTime) {
    return LIVE_AUCTION
  }
  if (status === LIVE_AUCTION && bid_current > bid_amount) {
    return PLACED_BID
  }
  if (status === LIVE_AUCTION && ownerId === userId) {
    return OWNED
  }
}
