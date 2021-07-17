import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectBid, selectAssetTokenRates, selectUser, selectAssetDetails } from 'stores/selectors'
import { acceptBidRequest } from 'stores/reducers/placeBid'
import { Box, Button, makeStyles, createStyles } from '@material-ui/core'
import { CardHistory } from 'common'
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'
import { normalizeDate } from 'utils'

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

export default function History() {
  const [showMore, setShowMore] = useState<boolean>(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    bid: { bidHistory },
  } = useSelector(selectBid())
  const bidHistoryReverse = bidHistory.slice().reverse()
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const { user } = useSelector(selectUser())
  const {
    assetDetails: { ownerData, marketData },
  } = useSelector(selectAssetDetails())

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

  const handleAcceptOffer = () => {
    dispatch(acceptBidRequest({ creatorId: bidHistory[0].order_id, buyerId: bidHistoryReverse[0].order_id }))
  }

  const handleCancelOffer = ({
    id,
    order_id,
    user_id,
    market_id,
  }: {
    id: number
    order_id: string
    user_id: string
    market_id: string
  }) => {
    console.log(id, order_id, user_id, market_id)
  }

  const expireTime = marketData && normalizeDate(marketData?.end_time).getTime() > new Date().getTime()

  if (bidHistory.length > 4 && !showMore) {
    return (
      <Box mt={3} mb={3}>
        {bidHistoryReverse.slice(0, 4).map((props, i) => {
          return (
            <CardHistory
              key={i}
              {...props}
              {...getBidAmountToTokenAndUsd(props.bid_amount)}
              userWalletId={user?.id}
              onAccept={!i && user?.id === ownerData?.id ? handleAcceptOffer : undefined}
              onCancel={
                user?.id === +props.user_id && expireTime && marketData && marketData?.type === 'auction'
                  ? handleCancelOffer
                  : undefined
              }
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
      {bidHistoryReverse.map((props, i) => (
        <CardHistory
          key={i}
          {...props}
          {...getBidAmountToTokenAndUsd(props.bid_amount)}
          userWalletId={user?.id}
          onAccept={!i && user?.id === ownerData?.id ? handleAcceptOffer : undefined}
          onCancel={
            user?.id === +props.user_id && expireTime && marketData && marketData?.type === 'auction'
              ? handleCancelOffer
              : undefined
          }
        />
      ))}
    </Box>
  )
}
