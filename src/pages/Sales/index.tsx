import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { PageWrapper } from 'common'
import { useStyles } from './styles'

export default function Sales() {
  const classes = useStyles()

  return (
    <PageWrapper className={classes.container}>
      <Box>
        <Typography variant={'h1'} color={'textPrimary'}>
          Sales
        </Typography>
        <Box mt={6} mb={4}>
          dons
        </Box>
      </Box>
    </PageWrapper>
  )
}
