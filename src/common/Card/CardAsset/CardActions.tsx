import React from 'react'
import BigNumber from 'bignumber.js'
import clsx from 'clsx'
import { Box, Button, Typography, ButtonBase } from '@material-ui/core'
import { TimeIcon, BurnIcon } from 'common/icons'
import appConst from 'config/consts'
import { useDefaultCardStatus } from './lib'
import { ICardActionsProps } from './types'
import { useStyles } from './styles'
import { normalizeDate } from 'utils'

const {
  FILTER_VALUES: { MINTED, LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, COLLECTED, CREATED, SOLD },
} = appConst

export default function CardActions(props: ICardActionsProps) {
  const classes = useStyles()
  const {
    endPrice,
    startPrice,
    sold,
    endTime = '0',
    burnTime = 0,
    timer,
    type,
    status,
    useCardStatus = useDefaultCardStatus,
  } = props

  const cardStatus = useCardStatus({ type, status, endPrice, startPrice, sold, endTime })

  const startPriceToCoin = startPrice
    ? new BigNumber(startPrice)
        .dividedBy(`10e${18 - 1}`)
        .toNumber()
        .toFixed(7)
    : startPrice
  const currentBitToCoin = endPrice
    ? new BigNumber(endPrice)
        .dividedBy(`10e${18 - 1}`)
        .toNumber()
        .toFixed(7)
    : endPrice

  const now_time = new Date().getTime()
  switch (cardStatus) {
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
            value={now_time < normalizeDate(endTime).getTime() ? `${startPriceToCoin || currentBitToCoin} ETH` : '-'}
          />
          {now_time < normalizeDate(endTime).getTime() ? (
            <ButtonBase
              className={clsx(classes.actionBtn, normalizeDate(endTime).getTime() < burnTime && classes.actionBtnBurn)}
            >
              {normalizeDate(endTime).getTime() < burnTime ? (
                <BurnIcon className={classes.actionBtnIcon} />
              ) : (
                <TimeIcon className={classes.actionBtnIcon} />
              )}
              {timer}
            </ButtonBase>
          ) : null}
        </Box>
      )
    case BUY_NOW:
      return (
        <Box className={classes.cardAction}>
          <Section text={'Buy Now'} value={`${startPriceToCoin} ETH`} />
        </Box>
      )
    case RESERVE_NOT_MET:
      return (
        <Box className={classes.cardAction}>
          <Section text={'Reserve Price'} value={startPriceToCoin ? `${startPriceToCoin} ETH` : '-'} />
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
          <Section text={'Reserve Not Met'} value={`${startPriceToCoin} ETH`} />
        </Box>
      )
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
