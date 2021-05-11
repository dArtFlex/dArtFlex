import React from 'react'
import { Card, Box, Typography, Divider, Tooltip } from '@material-ui/core'
import { InfoIcon } from 'common/icons'
import { useStyles } from './styles'

export default function ValuesInfo() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Box className={classes.box}>
        <Typography variant={'h3'}>25 ETH</Typography>
        <Box className={classes.infoRowIcon}>
          <Typography className={classes.helperText}>Total Sales </Typography>
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={`Total Sales is the sum of your sales in ETH. New sales will be shown as pending until a collector claims your NFT.`}
          >
            <InfoIcon />
          </Tooltip>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box className={classes.box}>
        <Typography variant={'h3'}>22,5 ETH</Typography>
        <Box className={classes.infoRowIcon}>
          <Typography className={classes.helperText}>Net Sale Revenue </Typography>
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={`Net Sale Revenue is the total amount earned in ETH, minus the 2,5% service fee on all auction Prices. New revenue will be shown as pending until a collector claims your NFT.`}
          >
            <InfoIcon />
          </Tooltip>
        </Box>
      </Box>
    </Card>
  )
}
