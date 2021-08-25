import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { PageWrapperProps } from './types'
import { useStyles } from './styles'
import clsx from 'clsx'

export default function PageWrapper({ children, className, ...props }: PageWrapperProps) {
  const classes = useStyles()

  return (
    <Box className={clsx(classes.root, className)} {...props}>
      <Box className={classes.banner}>
        <Typography variant={'h3'}>This project is in beta. DYOR</Typography>
      </Box>
      {children}
    </Box>
  )
}
