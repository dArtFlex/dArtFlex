import React from 'react'
import clsx from 'clsx'
import { Box, Button, Typography, ButtonBase } from '@material-ui/core'
import { TimeIcon, BurnIcon } from 'common/icons'
import appConst from 'config/consts'
import { ICardActionsProps } from './types'
import { useStyles } from './styles'

const {
  FILTER_VALUES: { MINTED, LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD, COLLECTED, CREATED, UNLISTED },
} = appConst

export default function CardActions(props: ICardActionsProps) {
  const classes = useStyles()
  const { status, currentBit, priceReserve, price, sold, expPeriod = 0, burnTime = 0, timer } = props

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
          <Section text={currentBit ? 'Current Bid' : 'Reserve Price'} value={`${priceReserve || currentBit} ETH`} />
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
          <Section text={'Reserve Price'} value={priceReserve ? `${priceReserve} ETH` : '-'} />
        </Box>
      )
    case SOLD:
      return (
        <Box className={classes.cardAction}>
          <Section text={'Sold for'} value={`${sold} ETH`} />
        </Box>
      )
    case COLLECTED:
      return <Box className={classes.cardAction}></Box>
    case CREATED:
      return <Box className={classes.cardAction}></Box>
    case UNLISTED:
      return <Box className={classes.cardAction}></Box>
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
