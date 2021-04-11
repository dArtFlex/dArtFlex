import React from 'react'
import { Box } from '@material-ui/core'
import { PageWrapperProps } from './types'
import { useStyles } from './styles'

export default function PageWrapper({ children, ...props }: PageWrapperProps) {
  const classes = useStyles()

  return (
    <Box className={classes.root} {...props}>
      {children}
    </Box>
  )
}
