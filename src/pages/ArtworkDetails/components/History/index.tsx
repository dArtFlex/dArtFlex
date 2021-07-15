import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectBid, selectAssetTokenRates, selectUser } from 'stores/selectors'
import { Box, Button, makeStyles, createStyles } from '@material-ui/core'
import { CardHistory } from 'common'
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'

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
  const {
    bid: { bidHistory },
  } = useSelector(selectBid())
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const { user } = useSelector(selectUser())

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

  if (bidHistory.length > 4 && !showMore) {
    return (
      <Box mt={3} mb={3}>
        {bidHistory
          .slice(0, 4)
          .reverse()
          .map((props, i) => (
            <CardHistory key={i} {...props} {...getBidAmountToTokenAndUsd(props.bid_amount)} userWalletId={user?.id} />
          ))}
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
      {bidHistory
        .slice()
        .reverse()
        .map((props, i) => (
          <CardHistory key={i} {...props} {...getBidAmountToTokenAndUsd(props.bid_amount)} userWalletId={user?.id} />
        ))}
    </Box>
  )
}
