import React from 'react'
import BigNumber from 'bignumber.js'
import clsx from 'clsx'
import { Box, Button, Typography, ButtonBase } from '@material-ui/core'
import { TimeIcon, BurnIcon } from 'common/icons'
import appConst from 'config/consts'
import { ICardActionsProps } from './types'
import { useStyles } from './styles'

const {
  STATUSES: { MINTED, LISTED, UNLISTED },
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD, COLLECTED, CREATED },
} = appConst

export default function CardActions(props: ICardActionsProps) {
  const classes = useStyles()
  const { status, currentBit, priceReserve, price, sold, expPeriod = 0, burnTime = 0, timer } = props

  const priceReserveToCoin = priceReserve
    ? new BigNumber(priceReserve)
        .dividedBy(`10e${18 - 1}`)
        .toNumber()
        .toFixed(2)
    : priceReserve
  const currentBitToCoin = currentBit
    ? new BigNumber(currentBit)
        .dividedBy(`10e${18 - 1}`)
        .toNumber()
        .toFixed(2)
    : currentBit

  switch (status) {
    case MINTED:
      return (
        <Box className={classes.actionBtnBox}>
          <Button variant={'contained'} fullWidth className={classes.listBtn}>
            List
          </Button>
        </Box>
      )
    case LIVE_AUCTION:
      return (
        <Box className={classes.cardAction}>
          <Section
            text={currentBitToCoin ? 'Current Bid' : 'Reserve Price'}
            value={`${priceReserveToCoin || currentBitToCoin} ETH`}
          />
          <ButtonBase className={clsx(classes.actionBtn, expPeriod < burnTime && classes.actionBtnBurn)}>
            {expPeriod < burnTime ? (
              <BurnIcon className={classes.actionBtnIcon} />
            ) : (
              <TimeIcon className={classes.actionBtnIcon} />
            )}
            {timer}
          </ButtonBase>
        </Box>
      )
    case BUY_NOW:
      return (
        <Box className={classes.cardAction}>
          <Section text={'Buy Now'} value={`${price} ETH`} />
        </Box>
      )
    case RESERVE_NOT_MET:
      return (
        <Box className={classes.cardAction}>
          <Section text={'Reserve Price'} value={priceReserveToCoin ? `${priceReserveToCoin} ETH` : '-'} />
        </Box>
      )
    case SOLD:
      return (
        <Box className={clsx(classes.cardAction, classes.cardActionSold)}>
          <Section text={'Sold for'} value={`${sold} ETH`} />
        </Box>
      )
    case COLLECTED:
      return (
        <Box className={clsx(classes.actionBtnBox, classes.collectedBoxBtn)}>
          <Button variant={'outlined'} className={classes.collectedBtn}>
            Sell
          </Button>
          <Button variant={'outlined'} className={classes.collectedBtn}>
            View Artwork
          </Button>
        </Box>
      )
    case CREATED:
      return (
        <Box className={clsx(classes.cardAction, classes.cardActionNotMet)}>
          <Section text={'Reserve Not Met'} value={`${priceReserveToCoin} ETH`} />
        </Box>
      )
    case UNLISTED:
      return <Box></Box>
    default:
      return null
  }
}

const Section = ({ text, value }: { text: string; value: string }) => (
  <Box>
    <Typography component={'span'}>{text}</Typography>
    <Typography color={'inherit'} variant={'h3'}>
      {value}
    </Typography>
  </Box>
)
