import React from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, Button, Link, IconButton } from '@material-ui/core'
import { ArrowLeftIcon } from 'common/icons'
import { selectAssetDetails, selectWallet, selectAssetTokenRates, selectUser } from 'stores/selectors'
import { Field, Tooltip } from 'common'
import { ApprovedFormState } from '../../../types'
import { useStyles } from '../styles'

interface IFormBuyApproveProps {
  onSubmit: () => void
  onMakeOffer: () => void
}

export default function FormBuyApprove(props: IFormBuyApproveProps) {
  const classes = useStyles()
  const { onSubmit, onMakeOffer } = props
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()
  const { wallet } = useSelector(selectWallet())
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const { user } = useSelector(selectUser())

  const {
    assetDetails: { marketData, tokenData },
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
  const disabledBuy =
    isValidValueAmount &&
    Boolean(values.acknowledge) &&
    Boolean(values.agreeTerms) &&
    Number(tokenData?.owner) !== user?.id

  return (
    <>
      <Box className={classes.formContainer}>
        <Box className={classes.formContant}>
          <Box className={classes.formHead}>
            <IconButton className={classes.backIcon} onClick={() => setFieldValue('formProgress', 'details')}>
              <ArrowLeftIcon />
            </IconButton>
            <Typography variant="h1" component="p">
              Buy Now
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
          <Box mb={8.5} className={classes.priceRow}>
            <Typography variant="body1" color="textSecondary">
              Buy Now Price
            </Typography>
            <Box mt={2}>
              <Typography
                className={clsx(classes.tokenAmount, classes.fontFamilyRoboto)}
              >{`${startPriceToToken} ETH`}</Typography>
              <Typography
                className={clsx(classes.tokenAmountUsd, classes.fontFamilyRoboto)}
              >{`$${priceToUsd}`}</Typography>
            </Box>
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
            className={clsx(classes.bitBtn, !disabledBuy && classes.bitBtnDisabled)}
            disabled={!disabledBuy}
          >
            {!isValidValueAmount ? (
              <Typography className={classes.bitBtnDisabledText}>You don’t have enough ETH</Typography>
            ) : (
              `Buy Now for ${startPriceToToken} ETH`
            )}
          </Button>
          {/******************************************************************************************************************************/}
          {/************* Button below should be removed after that common button will be able to handle make offer request **************/}
          {/******************************************************************************************************************************/}
          <Button
            onClick={onMakeOffer}
            variant={'contained'}
            color={'primary'}
            fullWidth
            disableElevation
            className={clsx(classes.bitBtn, !disabledBuy && classes.bitBtnDisabled)}
          >
            Make offer
          </Button>
        </Box>
      </Box>
    </>
  )
}
