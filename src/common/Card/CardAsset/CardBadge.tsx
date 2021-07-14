import React from 'react'
import clsx from 'clsx'
import { Box, Icon, Typography } from '@material-ui/core'
import appConst from 'config/consts'
import { ICardBadgeProps } from './types'
import { useStyles } from './styles'

const {
  STATUSES: { MINTED, UNLISTED },
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW },
} = appConst

export default function CardBadge(props: ICardBadgeProps) {
  const { status } = props
  const classes = useStyles()

  switch (status) {
    case MINTED:
      return (
        <Box className={classes.badgeBox}>
          <Icon className={clsx(classes.badgeIcon, classes.yellow)}></Icon>
          <Typography variant={'body1'}>Minted</Typography>
        </Box>
      )
    case LIVE_AUCTION:
    case BUY_NOW:
      return (
        <Box className={classes.badgeBox}>
          <Icon className={clsx(classes.badgeIcon, classes.green)}></Icon>
          <Typography variant={'body1'}>Listed</Typography>
        </Box>
      )
    case UNLISTED:
      return (
        <Box className={classes.badgeBox}>
          <Icon className={clsx(classes.badgeIcon, classes.red)}></Icon>
          <Typography variant={'body1'}>Unlisted</Typography>
        </Box>
      )
    default:
      return null
  }
}
