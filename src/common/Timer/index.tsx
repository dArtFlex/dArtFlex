import React from 'react'
import clsx from 'clsx'
import { Box } from '@material-ui/core'
import { BurnIcon, TimeIcon } from 'common/icons'
import { useTimer } from 'hooks'
import { useStyles } from './styles'

interface ITimepProps {
  endDate: number // as timestamp
  burnAt?: number // as timestamp
  className?: string
}

const HOUR = 3.6e6

export default function Timer(props: ITimepProps) {
  const classes = useStyles()
  const { endDate, burnAt = new Date().getTime() + HOUR, className = '' } = props
  const expDate = endDate < burnAt

  const { timer } = useTimer(endDate)

  return (
    <Box className={clsx(classes.timer, className, expDate && classes.timerBurn, expDate && { burn: 'class-burn' })}>
      {expDate ? <BurnIcon className={classes.icon} /> : <TimeIcon className={classes.icon} />}
      {timer}
    </Box>
  )
}
