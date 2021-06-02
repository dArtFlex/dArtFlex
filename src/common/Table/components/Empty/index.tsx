import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './styles'

export default function EmptyTable() {
  const classes = useStyles()
  return (
    <Box className={classes.empty}>
      <Typography variant="body1">Empty</Typography>
    </Box>
  )
}
