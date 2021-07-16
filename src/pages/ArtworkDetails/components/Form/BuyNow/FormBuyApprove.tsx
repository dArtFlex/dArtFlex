import React from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, Button, Link } from '@material-ui/core'
import { InfoIcon } from 'common/icons'
import { selectAssetDetails, selectWallet, selectAssetTokenRates } from 'stores/selectors'
import { Field } from 'common'
import { ApprovedFormState } from '../../../types'
import { useStyles } from '../styles'

export default function FormBuyApprove() {
  const classes = useStyles()
  const { values, handleSubmit } = useFormikContext<ApprovedFormState>()
  const { wallet } = useSelector(selectWallet())
  const { exchangeRates } = useSelector(selectAssetTokenRates())

  const {
    assetDetails: { marketData },
  } = useSelector(selectAssetDetails())

  const tokenInfo = exchangeRates ? exchangeRates.find((tR) => tR.id === '0x') : null

  const tokenBalanceETH = tokenInfo ? wallet?.balance || 0 : 0
  const tokenRate = tokenInfo ? tokenInfo?.rateUsd || 0 : 0

  const startPriceToToken =
    marketData?.start_price && tokenInfo
      ? new BigNumber(marketData?.start_price).dividedBy(`10e${18 - 1}`).toNumber()
      : 0
  const priceToUsd =
    startPriceToToken && tokenInfo ? new BigNumber(startPriceToToken).multipliedBy(tokenRate).toNumber().toFixed(2) : 0

  const isValidValueAmount = Number(tokenBalanceETH) >= Number(startPriceToToken)
  const disabledBid = isValidValueAmount && Boolean(values.acknowledge) && Boolean(values.agreeTerms)

  return (
    <>
      <Box className={classes.formContainer}>
        <Box className={classes.formContant}>
          <Box mb={4}>
            <Typography variant="h1" component="p">
              Buy Now
            </Typography>
          </Box>
          <Box mb={5}>
            <Box className={classes.infoRowIcon}>
              <Typography className={classes.warningText}>{`This item hasn't been reviewed by dArtflex`}</Typography>
              <InfoIcon />
            </Box>
          </Box>
          <Box mb={5} className={classes.priceRow}>
            <Typography variant="body1" color="textSecondary">
              Your Balance
            </Typography>
            <Typography className={classes.boldText}>{`${tokenBalanceETH.toFixed(4)} ETH`}</Typography>
          </Box>
          <Box mb={8.5} className={classes.priceRow}>
            <Typography variant="body1" color="textSecondary">
              Buy Now Price
            </Typography>
            <Typography className={classes.boldText}>{`${startPriceToToken} ETH`}</Typography>
          </Box>

          <Box mt={2}>
            <Typography className={classes.warningText}>{`$${priceToUsd}`}</Typography>
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
            onClick={() => handleSubmit()}
            variant={'contained'}
            color={'primary'}
            fullWidth
            disableElevation
            className={clsx(classes.bitBtn, !disabledBid && classes.bitBtnDisabled)}
            disabled={!disabledBid}
          >
            {!isValidValueAmount ? (
              <Typography className={classes.bitBtnDisabledText}>You don’t have enough ETH</Typography>
            ) : (
              'Place a Bid'
            )}
          </Button>
        </Box>
      </Box>
    </>
  )
}
