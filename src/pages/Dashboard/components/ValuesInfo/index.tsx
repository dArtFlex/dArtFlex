import React from 'react'
import { Card, Box, Typography, Divider } from '@material-ui/core'
import { Tooltip } from 'common'
import { useStyles } from './styles'

export default function ValuesInfo() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Box className={classes.box}>
        <Typography variant={'h3'}>25 ETH</Typography>
        <Box className={classes.infoRowIcon}>
          <Tooltip
            text={'Total Sales'}
            desc={`Total Sales is the sum of your sales in ETH. New sales will be shown as pending until a collector claims your NFT.`}
            className={classes.helperText}
          />
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box className={classes.box}>
        <Typography variant={'h3'}>22,5 ETH</Typography>
        <Box className={classes.infoRowIcon}>
          <Tooltip
            text={'Net Sale Revenue'}
            desc={`Net Sale Revenue is the total amount earned in ETH, minus the 2,5% service fee on all auction Prices. New revenue will be shown as pending until a collector claims your NFT.`}
            className={classes.helperText}
          />
        </Box>
      </Box>
    </Card>
  )
}
