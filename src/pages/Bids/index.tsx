import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Box, Typography } from '@material-ui/core'
import { PageWrapper } from 'common'
import { CardBid } from './components'
import BidDetails from './BidDetails'
import { useStyles } from './styles'
import appConsts from 'config/consts'
import { IBids } from './types'

const {
  FILTER_VALUES: { LIVE_AUCTION },
} = appConsts

const PLACED_BID = ''
const OWNED = ''

const MY_BIDS: IBids[] = [
  {
    tokenId: uuidv4(),
    image: 'https://picsum.photos/100/150',
    name: 'Over Indulgence 2',
    status: LIVE_AUCTION,
    endDate: new Date().getTime() + 1900800000, // + 22 days
    creator: {
      avatar: 'https://picsum.photos/100/100',
      name: 'gianapress',
    },
    currentBid: 0.044,
    currentBidUsd: 797.63,
    yourBid: 0.044,
    yourBidUsd: 797.63,
  },
  {
    tokenId: uuidv4(),
    image: 'https://picsum.photos/162/147',
    name: 'Broadleaf Lane',
    status: PLACED_BID,
    endDate: new Date().getTime() + 720000, // + 12 min
    creator: {
      avatar: 'https://picsum.photos/150/150',
      name: 'qwerty1212',
    },
    currentBid: 1.2,
    currentBidUsd: 2797.63,
    yourBid: 0.999,
    yourBidUsd: 2001.63,
  },
  {
    tokenId: uuidv4(),
    image: 'https://picsum.photos/250/148',
    name: 'Broadleaf Lane',
    status: OWNED,
    endDate: new Date().getTime() - 60000, // - 1 min
    creator: {
      avatar: 'https://picsum.photos/120/120',
      name: 'vasya',
    },
    currentBid: null,
    currentBidUsd: null,
    yourBid: null,
    yourBidUsd: null,
  },
]

export default function TradingHistory() {
  const classes = useStyles()

  return (
    <PageWrapper className={classes.container}>
      <Box>
        <Typography variant={'h1'} color={'textPrimary'}>
          Bids
        </Typography>
        <Box className={classes.cardBidContainer}>
          {MY_BIDS.map((bid, i) => (
            <CardBid key={i} bid={bid} />
          ))}
        </Box>
      </Box>
    </PageWrapper>
  )
}

export { BidDetails }
