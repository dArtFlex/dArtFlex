import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Divider, useMediaQuery } from '@material-ui/core'
import { Field, InputAdornment, SelectPaymentToken } from 'common'
import { Instructions } from '../../components'
import appConst from 'config/consts'
import { ISellArtwork } from '../../types'
import { IChainId } from 'types'
import tokensAll from 'core/tokens'
import { walletService } from 'services/wallet_service'
import { useStyles } from './styles'
import { daysInMonth, validatePrice, networkConvertor } from 'utils'
import clsx from 'clsx'

const {
  SCHEDULE: { DAYS5, DAYS3, WEEK, MONTH, SPECIFIC, NEVER },
} = appConst

const schedule = [
  {
    value: DAYS5,
    label: 'In 5 Days',
  },
  {
    value: DAYS3,
    label: '3 days',
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
const schedulePlus = [
  ...schedule,
  {
    value: NEVER,
    label: 'Never',
  },
]

export default function SetPriceForm() {
  const classes = useStyles()
  const { values, setFieldValue } = useFormikContext<ISellArtwork>()
  const days = daysInMonth(new Date().getDay(), new Date().getFullYear())

  const getChainId: IChainId = networkConvertor(walletService.getChainId())
  const tokens = tokensAll[getChainId]

  useEffect(() => {
    tokens && setFieldValue('salesTokenContract', tokens[0].id)
  }, [])

  useEffect(() => {
    switch (values.futureTime) {
      case '5days':
        return setFieldValue('startDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 5))
      case '3days':
        return setFieldValue('startDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3))
      case 'week':
        return setFieldValue('startDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7))
      case 'month':
        return setFieldValue('startDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * days))
    }
  }, [values.futureTime])

  const isMobile = useMediaQuery('(max-width: 480px)')

  return (
    <>
      {values.isEndingPrice ? (
        <>
          <Typography className={classes.sectionTitle}>Starting Price</Typography>
          <Box pb={6.5}>
            <Typography variant={'body1'} color={'textSecondary'}>
              Set an initial price
            </Typography>
          </Box>
          <Field
            type="input"
            name="startingPrice"
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
            typeValue="number"
          />
        </>
      ) : (
        <>
          <Typography className={classes.sectionTitle}>Price</Typography>
          <Box pb={6.5}>
            <Typography variant={'body1'} color={'textSecondary'}>
              Will be on sale until you transfer this item or cancel it.
            </Typography>
          </Box>
          <Field
            type="input"
            name="price"
            validate={validatePrice}
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
                      availableTokens={['0x']}
                    />
                  }
                />
              ),
            }}
            typeValue="number"
          />
        </>
      )}

      <Divider className={classes.divider} />

      {values.isEndingPrice ? (
        <>
          <Box className={classes.flexColumn} pb={4}>
            <Typography className={classes.mainText} color={'textPrimary'}>
              Expiration Date
            </Typography>
          </Box>
          <Typography className={classes.mainText} color={'textSecondary'}>
            Your listing will automatically end at this time. No need to cancel it!
          </Typography>
          <Box pt={6} className={classes.flexBox}>
            <Field type="select" options={schedulePlus} name="futureTime" fullWidth={false} />
            {values.futureTime === SPECIFIC && <Field type="picker" name="startDate" fullWidth={false} />}
          </Box>
        </>
      ) : (
        <>
          <Box className={classes.flexColumn} pb={4}>
            <Typography className={classes.mainText} color={'textPrimary'}>
              Schedule for a future time
            </Typography>
            <Field type="switch" name="isFutureTime" fullWidth={false} className={classes.switcher} />
          </Box>
          <Typography className={classes.mainText} color={'textSecondary'}>
            You can schedule this listing to only be buyable at a future date
          </Typography>
          {values.isFutureTime && (
            <Box pt={6} className={clsx(classes.flexBox, classes.flexContent)}>
              <Field
                type="select"
                options={schedule}
                name="futureTime"
                fullWidth={isMobile}
                className={classes.switcher}
              />
              {values.futureTime === SPECIFIC && <Field type="pickerTime" name="startDate" fullWidth={isMobile} />}
            </Box>
          )}
        </>
      )}

      <Divider className={classes.divider} />

      <Instructions />
    </>
  )
}
