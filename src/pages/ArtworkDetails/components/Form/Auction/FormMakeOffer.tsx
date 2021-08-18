import React from 'react'
import { useStyles } from '../styles'
import { useFormikContext } from 'formik'
import { ApprovedFormState } from '../../../types'
import { useSelector } from 'react-redux'
import { selectAssetTokenRates, selectWallet } from '../../../../../stores/selectors'
import { Box, Button, IconButton, Link, Typography } from '@material-ui/core'
import { ArrowLeftIcon } from 'common/icons'
import { Field, InputAdornment, Tooltip } from 'common'
import clsx from 'clsx'
import BigNumber from 'bignumber.js'
import appConst from '../../../../../config/consts'

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

interface IFormMakeOffer {
  onSubmit: () => void
}

export default function FormMakeOffer(props: IFormMakeOffer) {
  const classes = useStyles()
  const { onSubmit } = props
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()
  const { wallet } = useSelector(selectWallet())
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const tokenInfo = exchangeRates ? exchangeRates.find((tR) => tR.id === '0x') : null
  const tokenBalanceETH = tokenInfo ? wallet?.balance || 0 : 0
  const tokenRate = tokenInfo ? tokenInfo?.rateUsd || 0 : 0
  const bidValueAmountUsd =
    values.bid && parseFloat(`${values.bid}`)
      ? new BigNumber(values.bid).multipliedBy(tokenRate).toNumber().toFixed(2)
      : 0

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box className={classes.formHead}>
          <IconButton className={classes.backIcon} onClick={() => setFieldValue('formProgress', 'details')}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant="h1" component="p">
            Make offer
          </Typography>
        </Box>
        <Box mb={5}>
          <Tooltip
            text={`This item hasn't been reviewed by dArtflex`}
            desc={`You should proceed with extra caution. Anyone can create a digital item on a blockchain with any name, including fake versions of existing items. Please take extra caution and do your research when interacting with this item to ensure it's what it claims to be.`}
            className={classes.tooltip}
          />
        </Box>
        <Box mb={5} className={classes.priceRow}>
          <Typography variant="body1" color="textSecondary">
            Your Balance
          </Typography>
          <Typography className={clsx(classes.boldText, classes.fontFamilyRoboto)}>{`${tokenBalanceETH.toFixed(
            4
          )} ETH`}</Typography>
        </Box>
        <Field
          type="input"
          name="bid"
          variant="outlined"
          className={classes.rootField}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="start"
                icon={
                  <Typography className={classes.inputAdorment} color={'textSecondary'}>
                    ETH
                  </Typography>
                }
              />
            ),
          }}
          typeValue="number"
          defaultValue={0}
          helperText={`$${bidValueAmountUsd}`}
        />
        <Box mt={6}>
          <Typography className={classes.textBold}>Offer expiration</Typography>
        </Box>
        <Box className={clsx(classes.gridBox, classes.dateSelect)}>
          <Field type="select" options={schedule} name="offerExpiration" fullWidth={false} />
          {values.offerExpiration === SPECIFIC && <Field type="pickerTime" name="endDate" fullWidth={false} />}
        </Box>

        <Box mt={6} mb={4}>
          <Field
            type="checkbox"
            name="acknowledge"
            label={'I acknowledge that this item has not been reviewed or approved by dArtflex'}
            className={classes.checkbox}
          />
        </Box>

        <Box mb={6}>
          <Field
            type="checkbox"
            name="agreeTerms"
            // Todo: Need to fixed ts issue
            // @ts-ignore
            label={
              <Typography className={classes.warningText}>
                {`I agree with dArtflex's `}
                <Link>Terms and Services</Link>
              </Typography>
            }
            className={classes.checkbox}
          />
        </Box>
        <Button
          onClick={onSubmit}
          variant={'contained'}
          color={'primary'}
          fullWidth
          disableElevation
          className={classes.bitBtn}
        >
          <Typography>Make offer</Typography>
        </Button>
      </Box>
      <Typography align={'center'} className={clsx(classes.textBold, classes.bottomInfoText)}>
        Learn how our auction works
      </Typography>
    </Box>
  )
}
