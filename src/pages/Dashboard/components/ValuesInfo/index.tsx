import React from 'react'
import { Card, Box, Typography, Divider } from '@material-ui/core'
import { Tooltip } from 'common'
import { useStyles } from './styles'

interface IValuesInfoProps {
  totalSalesToEth: string
  totalRevenueToEth: string
}

export default function ValuesInfo(props: IValuesInfoProps) {
  const classes = useStyles()
  const { totalSalesToEth, totalRevenueToEth } = props

  return (
    <Card className={classes.card}>
      <Box className={classes.box}>
        <Typography variant={'h3'}>{`${totalSalesToEth} BNB`}</Typography>
        <Box className={classes.infoRowIcon}>
          <Tooltip
            text={'Total Sales'}
            desc={`Total Sales is the sum of your sales in BNB. New sales will be shown as pending until a collector claims your NFT.`}
            className={classes.helperText}
          />
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box className={classes.box}>
        <Typography variant={'h3'}>{`${totalRevenueToEth} BNB`}</Typography>
        <Box className={classes.infoRowIcon}>
          <Tooltip
            text={'Net Sale Revenue'}
            desc={`Net Sale Revenue is the total amount earned in BNB, minus the 2,5% service fee on all auction Prices. New revenue will be shown as pending until a collector claims your NFT.`}
            className={classes.helperText}
          />
        </Box>
      </Box>
    </Card>
  )
}
