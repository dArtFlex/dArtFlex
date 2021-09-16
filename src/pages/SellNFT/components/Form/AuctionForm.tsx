import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Divider } from '@material-ui/core'
import { Field, InputAdornment, Tooltip } from 'common'
import { Instructions, SelectPaymentToken } from '../../components'
import appConst from 'config/consts'
import { ISellArtwork } from '../../types'
import { IChainId } from 'types'
import tokensAll from 'core/tokens'
import { walletService } from 'services/wallet_service'
import { useStyles } from './styles'
import { validateExpirationDate, validateMinimumBid } from '../../lib'
import { daysInMonth, networkConvertor } from 'utils'

const {
  SCHEDULE: { DAYS3, DAYS5, WEEK, MONTH, SPECIFIC },
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
]

export default function AuctionForm() {
  const classes = useStyles()

  const { values, setFieldValue } = useFormikContext<ISellArtwork>()
  const days = daysInMonth(new Date().getDay(), new Date().getFullYear())

  const getChainId: IChainId = networkConvertor(walletService.getChainId())
  const tokens = tokensAll[getChainId]

  useEffect(() => {
    tokens && setFieldValue('salesTokenContract', tokens[1].id)
  }, [])

  useEffect(() => {
    switch (values.expirationTime) {
      case '5days':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 5))
      case '3days':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3))
      case 'week':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7))
      case 'month':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * days))
    }
  }, [values.expirationTime])

  return (
    <>
      {/* ************** Todo: Next version ************** */}
      {/* <Box className={classes.sectionTitleBox}>
        <Typography>Minimum Bid</Typography>
        <Tooltip
          desc={`The starting bid price will be publicly visible.
          If you receive a bid above the starting value but below your reserve price - you can accept it at any time.`}
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
        validate={validateMinimumBid}
        variant="outlined"
        fullWidth={false}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="start"
              icon={
                <Typography className={classes.mainText} color={'textSecondary'}>
                  WETH
                </Typography>
              }
            />
          ),
        }}
        typeValue="number"
      />
      <Divider className={classes.divider} /> */}
      <Box className={classes.sectionTitleBox}>
        <Typography>Reserve Price</Typography>
        <Tooltip
          desc={`If you don't receive any bids equal to or greater than your reserve price, the auction will end without a sale.  We recommended a minimum reserve price of = 1 or the equivalent value in your selected token.`}
        />
      </Box>
      <Box pb={6.5}>
        <Typography variant={'body1'} color={'textSecondary'}>
          Set your starting price
        </Typography>
      </Box>
      <Field
        type="input"
        name="minimumBid"
        validate={validateMinimumBid}
        variant="outlined"
        fullWidth={false}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="start"
              placeholder={
                <SelectPaymentToken
                  tokens={tokens}
                  salesTokenContract={values.salesTokenContract}
                  setSalesTokenContract={(contract) => {
                    setFieldValue('salesTokenContract', contract)
                  }}
                  unavailableTokens={['0x']}
                />
              }
            />
          ),
        }}
        typeValue="number"
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
        <Field
          type="select"
          options={schedule}
          name="expirationTime"
          fullWidth={false}
          validate={() => validateExpirationDate('auction', values.expirationTime)}
        />
        {values.expirationTime === SPECIFIC && <Field type="pickerTime" name="endDate" fullWidth={false} />}
      </Box>

      <Instructions />
    </>
  )
}
