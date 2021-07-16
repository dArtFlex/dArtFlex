import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { IMakeOfferForm } from '../types'
import { Box, Button, Checkbox, IconButton, InputAdornment, OutlinedInput, Typography } from '@material-ui/core'
import { ArrowLeftIcon } from 'common/icons'
import clsx from 'clsx'
import { Field, Tooltip } from 'common'
import appConst from 'config/consts'
import { daysInMonth } from 'utils'
import { useStyles } from '../styles'

const {
  SCHEDULE: { DAYS3, DAYS5, MONTH, SPECIFIC },
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
    value: MONTH,
    label: '1 month',
  },
  {
    value: SPECIFIC,
    label: 'Custom Date',
  },
]

export default function FormConfirmOffer(props: IMakeOfferForm) {
  const classes = useStyles()

  const { values, setFieldValue, handleSubmit } = useFormikContext<{ offerExpiration: string; endDate: string }>()
  const days = daysInMonth(new Date().getDay(), new Date().getFullYear())

  useEffect(() => {
    switch (values.offerExpiration) {
      case '5days':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 5))
      case '3days':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3))
      case 'week':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7))
      case 'month':
        return setFieldValue('endDate', new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * days))
    }
  }, [values.offerExpiration])

  return (
    <Box className={classes.formConfirmOffer}>
      <Box className={classes.formConfirmOfferWrapper}>
        <Box className={classes.flexBox}>
          <IconButton className={classes.backIcon} onClick={() => props.setFormId(1)}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h1">Make offer</Typography>
        </Box>
        <Box mt={4} className={classes.flexBox}>
          <Tooltip
            text={`This item hasn't been reviewed by dArtflex`}
            desc={`You should proceed with extra caution. Anyone can create a digital item on a blockchain with any name, including fake versions of existing items. Please take extra caution and do your research when interacting with this item to ensure it's what it claims to be.`}
            className={classes.tooltip}
          />
        </Box>
        <Box className={clsx(classes.flexBox, classes.makeOfferBlock, classes.spaceContent)}>
          <Typography variant={'body1'} className={classes.textSecondary}>
            Your Balance
          </Typography>
          <span className={classes.textBold}>2.435 ETH</span>
        </Box>
        <OutlinedInput
          id="outlined-adornment-weight"
          endAdornment={
            <InputAdornment position="end">
              <Typography className={classes.adornmentText}>ETH</Typography>
            </InputAdornment>
          }
          className={classes.makeOfferInput}
          fullWidth
          classes={{ focused: classes.focusedInput }}
        />
        <Box>
          <Typography className={classes.descriptionText}>$1234.45</Typography>
        </Box>
        <Box mt={6}>
          <Typography className={classes.textBold}>Offer expiration</Typography>
        </Box>
        <Box className={clsx(classes.gridBox, classes.dateSelect, classes.gridGap)}>
          <Field type="select" options={schedule} name="offerExpiration" fullWidth={false} />
          {values.offerExpiration === SPECIFIC && <Field type="pickerTime" name="endDate" fullWidth={false} />}
        </Box>
        <Box mt={6}>
          <Box className={classes.rulesBox}>
            <Checkbox color="primary" classes={{ root: classes.checkBox }} />
            <span>I acknowledge that this item has not been reviewed or approved by dArtflex</span>
          </Box>
          <Box className={classes.rulesBox}>
            <Checkbox color="primary" classes={{ root: classes.checkBox }} />
            <span>I agree with dArtflex&apos;s Terms and Services</span>
          </Box>
          <Box mt={8}>
            <Button
              className={classes.makeOfferBlockContent}
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Make Offer
            </Button>
          </Box>
        </Box>
      </Box>
      <Typography align={'center'} className={clsx(classes.textBold, classes.bottomInfoText)}>
        Learn how our auctions work
      </Typography>
    </Box>
  )
}
