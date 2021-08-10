import React from 'react'
import clsx from 'clsx'
import { Box, Icon, Typography } from '@material-ui/core'
import appConst from 'config/consts'
import { ICardBadgeProps } from './types'
import { useStyles } from './styles'

const {
  STATUSES: { MINTED, UNLISTED, LISTED, SOLD },
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, COLLECTED },
} = appConst

export default function CardBadge(props: ICardBadgeProps) {
  const { status, sold } = props
  const classes = useStyles()

  switch (status) {
    case MINTED:
      return (
        <Box className={classes.badgeBox}>
          <Icon className={clsx(classes.badgeIcon, classes.yellow)} />
          <Typography variant={'body1'}>Minted</Typography>
        </Box>
      )
    case LISTED:
    case LIVE_AUCTION:
    case BUY_NOW:
      return (
        <Box className={classes.badgeBox}>
          <Icon className={clsx(classes.badgeIcon, classes.green)} />
          <Typography variant={'body1'}>Listed</Typography>
        </Box>
      )
    case UNLISTED:
      return (
        <Box className={classes.badgeBox}>
          <Icon className={clsx(classes.badgeIcon, classes.red)} />
          <Typography variant={'body1'}>Unlisted</Typography>
        </Box>
      )
    case COLLECTED:
      return !sold ? (
        <Box className={classes.badgeBox}>
          <Icon className={clsx(classes.badgeIcon, classes.blue)} />
          <Typography variant={'body1'}>On Sale</Typography>
        </Box>
      ) : (
        <Box className={classes.badgeBox}>
          <Icon className={clsx(classes.badgeIcon, classes.purple)} />
          <Typography variant={'body1'}>Purchased</Typography>
        </Box>
      )
    case SOLD:
      return (
        <Box className={classes.badgeBox}>
          <Icon className={clsx(classes.badgeIcon, classes.grey)} />
          <Typography variant={'body1'}>Sold</Typography>
        </Box>
      )
    default:
      return null
  }
}
