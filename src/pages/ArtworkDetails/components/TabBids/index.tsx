import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectAssetTokenRates, selectUser, selectAssetDetails } from 'stores/selectors'
import { acceptBidRequest, cancelBidRequest } from 'stores/reducers/placeBid'
import { acceptOfferRequest, cancelOfferRequest } from 'stores/reducers/makeOffer'
import { Box, Button, makeStyles, createStyles } from '@material-ui/core'
import { CardHistoryBids } from 'common'
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'
import { normalizeDate } from 'utils'
import { IBids, UserDataTypes } from 'types'
import APP_CONSTS from 'config/consts'

const {
  STATUSES: { SOLD, MINTED },
} = APP_CONSTS

const useStyles = makeStyles(() =>
  createStyles({
    showMoreBtn: {
      fontSize: 16,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  })
)

interface ITabHistoryPropa {
  bids: Array<IBids & { userData: UserDataTypes }>
  offers: Array<IBids & { userData: UserDataTypes }>
}

export default function TabBids(props: ITabHistoryPropa) {
  const { bids, offers } = props
  const [showMore, setShowMore] = useState<boolean>(false)
  const classes = useStyles()
  const dispatch = useDispatch()

  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const { user } = useSelector(selectUser())
  const {
    assetDetails: { marketData, tokenData, status },
  } = useSelector(selectAssetDetails())

  const history = marketData?.sold || marketData === null ? offers : bids
  const historyReverse = history ? history.slice().reverse() : []

  const tokenInfo = exchangeRates ? exchangeRates.find((tR) => tR.id === '0x') : null
  const tokenRate = tokenInfo ? tokenInfo?.rateUsd || 0 : 0

  const getBidAmountToTokenAndUsd = (bid_amount: string) => {
    const bidAmountToToken = new BigNumber(bid_amount)
      .dividedBy(`10e${18 - 1}`)
      .toNumber()
      .toFixed(4)
    const bidAmountUsd = new BigNumber(bidAmountToToken).multipliedBy(tokenRate).toNumber().toFixed(2)
    return { bidAmountToToken, bidAmountUsd }
  }

  const handleAcceptBid = () => {
    dispatch(
      acceptBidRequest({
        market_id: historyReverse[0].market_id,
        bid_id: historyReverse[0]?.id,
        assetOwnerId: tokenData?.owner,
      })
    )
  }

  const handleAcceptOffer = () => {
    dispatch(
      acceptOfferRequest({
        buyerId: historyReverse[0].order_id,
        bid_id: historyReverse[0]?.id,
        assetOwnerId: tokenData?.owner,
      })
    )
  }

  const handleCancelBid = ({ id }: { id: number }) => {
    dispatch(cancelBidRequest({ bid_id: id }))
  }

  const handleCancelOffer = ({ id }: { id: number }) => {
    dispatch(cancelOfferRequest({ id }))
  }

  const expireTime = marketData && normalizeDate(marketData?.end_time).getTime() > new Date().getTime()
  const expireDate = marketData ? normalizeDate(marketData.end_time) : normalizeDate(String(new Date().getTime()))

  const availableToAcceptBid = (i: number) => {
    return (
      i === 0 &&
      tokenData &&
      user?.id === +tokenData.owner &&
      marketData &&
      marketData?.type === 'auction' &&
      !marketData?.sold
    )
  }

  const availableToAcceptOffer = (i: number) => {
    return i === 0 && tokenData && user?.id === +tokenData.owner && marketData && marketData?.sold
  }

  if (history?.length > 4 && !showMore) {
    return (
      <Box mt={3} mb={3}>
        {historyReverse.slice(0, 4).map((props, i) => {
          return (
            <CardHistoryBids
              key={i}
              {...props}
              {...getBidAmountToTokenAndUsd(props.bid_amount)}
              userWalletId={user?.id}
              onAcceptBid={availableToAcceptBid(i) ? handleAcceptBid : undefined}
              onAcceptOffer={availableToAcceptOffer(i) ? handleAcceptOffer : undefined}
              onCancel={
                user?.id === +props.user_id && (expireTime || status === SOLD || status === MINTED)
                  ? status === SOLD
                    ? handleCancelBid
                    : handleCancelOffer
                  : undefined
              }
              expireDate={expireDate}
            />
          )
        })}
        <Button
          classes={{ root: classes.showMoreBtn }}
          disableRipple
          fullWidth
          onClick={() => setShowMore(true)}
          endIcon={<ArrowDropDownIcon />}
        >
          Show More
        </Button>
      </Box>
    )
  }

  return (
    <Box mt={3} mb={3}>
      {historyReverse.map((props, i) => {
        return (
          <CardHistoryBids
            key={i}
            {...props}
            {...getBidAmountToTokenAndUsd(props.bid_amount)}
            userWalletId={user?.id}
            onAcceptBid={availableToAcceptBid(i) ? handleAcceptBid : undefined}
            onAcceptOffer={availableToAcceptOffer(i) ? handleAcceptOffer : undefined}
            onCancel={
              user?.id === +props.userData?.id && (expireTime || status === SOLD || status === MINTED)
                ? status === SOLD
                  ? handleCancelBid
                  : handleCancelOffer
                : undefined
            }
            expireDate={expireDate}
          />
        )
      })}
    </Box>
  )
}
