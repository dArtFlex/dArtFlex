import React from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { Card, Box, Typography, Button } from '@material-ui/core'
import { Image, AvatarUser, Timer } from 'common'
import { CupIcon, ExclamationCircleIcon } from 'common/icons'
import { Informer } from '../../components'
import { ICardBidProps, IBidsProps } from './types'
import { useStyles } from './styles'
import appConsts from 'config/consts'
import routes from '../../../../routes'

const {
  FILTER_VALUES: { LIVE_AUCTION, PLACED_BID, OWNED },
} = appConsts

export default function CardBid(props: ICardBidProps) {
  const { bid } = props
  const { image, creator, name, endDate, currentBid, currentBidUsd, yourBid, yourBidUsd, status } = bid
  const classes = useStyles()
  const history = useHistory()

  return (
    <Card classes={{ root: classes.cardBid }}>
      <Box className={classes.cardBidImage}>
        <Image src={image} className={classes.image} />
      </Box>
      <Box className={classes.cardBidInfo}>
        <Box>
          <AvatarUser image={creator.avatar} name={creator.name} fontSize={14} />
          <Typography variant={'h4'} noWrap>
            {name}
          </Typography>
        </Box>
        {status !== OWNED && <Timer endDate={endDate} className={classes.timer} />}
      </Box>
      <Box className={classes.cardBidBids}>
        {currentBid && yourBid ? (
          <>
            <Bids title="Current Bid" bidAmount={currentBid as number} bidAmountUsd={currentBidUsd as number} />
            <Bids title="Your Bid" bidAmount={yourBid as number} bidAmountUsd={yourBidUsd as number} />
          </>
        ) : (
          <Informer
            iconTitle={<CupIcon />}
            title={'You are the winner!'}
            message={
              'Congratulations, you won the auction for this artwork. Now claim your NFT and add it to your collection!'
            }
          />
        )}
      </Box>
      <Box className={classes.cardBidAction}>
        {status !== OWNED && (
          <Box className={classes.informerHead}>
            {status === LIVE_AUCTION ? <CupIcon /> : <ExclamationCircleIcon />}
            <Typography variant={'body1'} noWrap>
              {status === LIVE_AUCTION ? 'You have a chance to win' : 'Your bet is outbid'}
            </Typography>
          </Box>
        )}

        {status === LIVE_AUCTION && (
          <Button className={clsx(classes.btnAction, classes.btnView)} variant={'outlined'}>
            View Artwork
          </Button>
        )}
        {status === PLACED_BID && (
          <Button className={clsx(classes.btnAction, classes.btnPlaceBid)} variant={'contained'}>
            Place a Bid
          </Button>
        )}
        {status === OWNED && (
          <Button
            className={clsx(classes.btnAction, classes.btnClaimNFT)}
            variant={'contained'}
            onClick={() => history.push(routes.bids + '/1009')}
          >
            Claim your NFT
          </Button>
        )}
      </Box>
    </Card>
  )
}

function Bids(props: IBidsProps) {
  const { title, bidAmount, bidAmountUsd } = props
  const classes = useStyles()
  return (
    <Box className={classes.bids}>
      <Typography variant={'body1'} color={'textSecondary'} noWrap>
        {title}
      </Typography>
      <Typography className={classes.bidsAmount} noWrap>{`${bidAmount} ETH`}</Typography>
      <Typography>{`$${bidAmountUsd}`}</Typography>
    </Box>
  )
}
