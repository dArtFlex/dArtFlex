import React from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { Card, Box, Typography, Button } from '@material-ui/core'
import { Image, AvatarUser, Timer } from 'common'
import { CupIcon, ExclamationCircleIcon } from 'common/icons'
import { ICardBidProps, IBidsProps } from './types'
import { useStyles } from './styles'
import routes from '../../../../routes'
import { normalizeDate, shortCutName } from 'utils'
import { useDispatch } from 'react-redux'
import { cancelOfferRequest } from '../../../../stores/reducers/makeOffer'

export default function CardBid(props: ICardBidProps) {
  const { bid } = props
  const { image, creator, name, endDate, currentBid, currentBidUsd, yourBid, yourBidUsd, status, itemId } = bid
  const classes = useStyles()

  const nowTime = new Date().getTime()
  const timeExpired = nowTime > normalizeDate(endDate).getTime()

  return (
    <Card classes={{ root: classes.cardBid }}>
      <Box className={classes.cardBidImage}>
        <Image src={image} className={classes.image} />
      </Box>
      <Box className={classes.cardBidInfo}>
        <Box>
          <AvatarUser image={creator.avatar} name={creator.name} fontSize={14} />
          <Typography variant={'h4'} noWrap>
            {shortCutName(name)}
          </Typography>
        </Box>
        {!timeExpired ? <Timer endDate={normalizeDate(endDate).getTime()} className={classes.timer} /> : null}
      </Box>
      <Box className={classes.cardBidBids}>
        {bid.status !== 'offered' && <Bids title="Current Bid" bidAmount={currentBid} bidAmountUsd={currentBidUsd} />}

        <Bids title="Your Bid" bidAmount={yourBid} bidAmountUsd={yourBidUsd} />
      </Box>
      <CardInfoBox status={status} timeExpired={timeExpired} itemId={itemId} id={bid.id} />
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

function CardInfoBox(props: ICardInfoBox) {
  const classes = useStyles()
  const { status, timeExpired, itemId, id } = props
  const history = useHistory()
  const dispatch = useDispatch()

  const handleCancelOffer = ({ id }: { id: number }) => {
    dispatch(cancelOfferRequest({ id: id }))
  }

  switch (status) {
    case 'offered':
      return (
        <Box className={classes.cardBidAction}>
          <Button
            onClick={() => handleCancelOffer({ id: id })}
            className={clsx(classes.btnAction, classes.btnCancel)}
            variant={'outlined'}
            fullWidth
          >
            Cancel offer
          </Button>
        </Box>
      )
    case 'bid':
      return (
        <Box className={classes.cardBidAction}>
          <Button className={clsx(classes.btnAction, classes.btnCancel)} variant={'outlined'} fullWidth>
            Cancel bid
          </Button>
        </Box>
      )
    case 'outbid':
      return (
        <Box className={classes.cardBidAction}>
          <Box className={classes.informerHead}>
            <ExclamationCircleIcon />
            <Typography variant={'body1'} noWrap>
              Your bet is outbid
            </Typography>
          </Box>
          <Button
            onClick={() => history.push(routes.artworkDetails.replace(':id', String(itemId)))}
            disabled={timeExpired}
            className={clsx(classes.btnAction, classes.btnPlaceBid)}
            variant={'contained'}
          >
            Place a Bid
          </Button>
        </Box>
      )
    default:
      return null
  }
}

export interface ICardInfoBox {
  id: number
  status: ICardBidProps['bid']['status']
  timeExpired: boolean
  itemId: ICardBidProps['bid']['itemId']
}
