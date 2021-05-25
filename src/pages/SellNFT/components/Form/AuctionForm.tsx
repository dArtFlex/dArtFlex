import React from 'react'
import { Box, Typography, Divider } from '@material-ui/core'
import { Field, InputAdornment, Tooltip } from 'common'
import { Instructions } from '../../components'
import appConst from 'config/consts'
import { useStyles } from './styles'

const {
  SCHEDULE: { DAYS3, DAYS5, WEEK, MONTH, SPECIFIC, NEVER },
} = appConst

const schedule = [
  {
    value: DAYS3,
    label: '3 days',
  },
  {
    value: DAYS5,
    label: '5 days',
  },
  {
    value: WEEK,
    label: '1 week',
  },
  {
    value: MONTH,
    label: '1 month',
  },
  {
    value: SPECIFIC,
    label: 'Set a specific day',
  },
  {
    value: NEVER,
    label: 'never',
  },
]

export default function AuctionForm() {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.sectionTitleBox}>
        <Typography>Minimum Bid</Typography>
        <Tooltip
          desc={`The starting bid price will be publicly visible.
If you receive a bid above the starting value but below your reserve price - you can accept it at any time. Note: = 0.00 is the average price of Animals collection this week (0.0% compared to last week)`}
        />
      </Box>
      <Box pb={6.5}>
        <Typography variant={'body1'} color={'textSecondary'}>
          Set your starting bid price
        </Typography>
      </Box>
      <Field
        type="input"
        name="minimumBid"
        variant="outlined"
        fullWidth={false}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="start"
              icon={
                <Typography className={classes.mainText} color={'textSecondary'}>
                  ETH
                </Typography>
              }
            />
          ),
        }}
      />

      <Divider className={classes.divider} />
      <Box className={classes.sectionTitleBox}>
        <Typography>Reserve Price</Typography>
        <Tooltip
          desc={`If you don't receive any bids equal to or greater than your reserve price, the auction will end without a sale.  We require a minimum reserve price of = 1 or the equivalent value in your selected token.`}
        />
      </Box>
      <Box pb={6.5}>
        <Typography variant={'body1'} color={'textSecondary'}>
          Create a hidden limit by setting a reserve price
        </Typography>
      </Box>
      <Field
        type="input"
        name="reservePrice"
        variant="outlined"
        fullWidth={false}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="start"
              icon={
                <Typography className={classes.mainText} color={'textSecondary'}>
                  ETH
                </Typography>
              }
            />
          ),
        }}
      />

      <Divider className={classes.divider} />
      <Box className={classes.flexColumn} pb={4}>
        <Typography className={classes.mainText} color={'textPrimary'}>
          Expiration Date
        </Typography>
      </Box>
      <Typography className={classes.mainText} color={'textSecondary'}>
        Your listing will automatically end at this time. No need to cancel it!
      </Typography>
      <Box pt={6} pb={10} className={classes.flexBox}>
        <Field type="select" options={schedule} name="expirationDate" fullWidth={false} />
      </Box>

      <Instructions />
    </>
  )
}
