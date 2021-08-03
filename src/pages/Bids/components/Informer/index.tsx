import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './styles'

interface IInformer {
  iconTitle?: JSX.Element | null
  title: string
  message: string
}

export default function Informer(props: IInformer) {
  const { iconTitle = null, title, message } = props
  const classes = useStyles()

  return (
    <Box className={classes.informerBox}>
      <Box className={classes.informerHead}>
        {iconTitle}
        <Typography variant={'h4'} className={classes.informerTitle}>
          {title}
        </Typography>
      </Box>
      <Typography variant={'body1'} color={'textSecondary'} align={'center'}>
        {message}
      </Typography>
    </Box>
  )
}
