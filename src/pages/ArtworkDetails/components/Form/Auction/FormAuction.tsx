import React from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectAssetDetails, selectWallet, selectAssetTokenRates, selectUser } from 'stores/selectors'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, Button, Link, IconButton } from '@material-ui/core'
import { Field, InputAdornment, Tooltip } from 'common'
import { ArrowLeftIcon } from 'common/icons'
import { useTokenInfo } from 'hooks'
import { ApprovedFormState } from '../../../types'
import { useStyles } from '../styles'
import { validatePrice } from '../../../../../utils'

interface IFormAuctionProps {
  onSubmit: () => void
}

export default function FormAuction(props: IFormAuctionProps) {
  const classes = useStyles()
  const { onSubmit } = props
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()
  const { tokensBalances } = useSelector(selectWallet())
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const { user } = useSelector(selectUser())

  const {
    assetDetails: { marketData, tokenData },
  } = useSelector(selectAssetDetails())

  const price = marketData ? marketData?.current_price || marketData?.start_price : 0
  const minBid =
    marketData?.current_price !== '0'
      ? new BigNumber(price)
          .plus(new BigNumber(price).multipliedBy(0.1).toNumber())
          .dividedBy(`10e${18 - 1}`)
          .toNumber()
      : new BigNumber(marketData?.start_price).dividedBy(`10e${18 - 1}`).toNumber()

  const tokenInfo = useTokenInfo(marketData?.sales_token_contract)

  const tokenBalanceWETH = tokenInfo ? tokensBalances?.find((t) => t.id === tokenInfo.id)?.balance || 0 : 0
  const tokenRate = exchangeRates
    ? exchangeRates.find((tR) => tokenInfo?.id && tR.id === tokenInfo.id)?.rateUsd || 0
    : 0
  const bidValueAmountUsd =
    values.bid && parseFloat(`${values.bid}`)
      ? new BigNumber(values.bid).multipliedBy(tokenRate).toNumber().toFixed(2)
      : 0
  const isValidBidValueAmount = Number(tokenBalanceWETH) > Number(values.bid) && Number(values.bid) >= Number(minBid)
  const disabledBid =
    isValidBidValueAmount &&
    Boolean(values.acknowledge) &&
    Boolean(values.agreeTerms) &&
    Number(tokenData?.owner) !== user?.id

  const token = useTokenInfo(marketData?.sales_token_contract)
  const tokenName = token?.symbol || ''

  return (
    <>
      <Box className={classes.formContainer}>
        <Box className={classes.formContant}>
          <Box className={classes.formHead}>
            <IconButton className={classes.backIcon} onClick={() => setFieldValue('formProgress', 'details')}>
              <ArrowLeftIcon />
            </IconButton>
            <Typography variant="h1" component="p">
              Place a bid
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
              You must bid at least
            </Typography>
            <Typography
              className={clsx(classes.boldText, classes.fontFamilyRoboto)}
            >{`${minBid} ${tokenName}`}</Typography>
          </Box>
          <Box mb={8.5} className={classes.priceRow}>
            <Typography variant="body1" color="textSecondary">
              Your Balance
            </Typography>
            <Typography className={clsx(classes.boldText, classes.fontFamilyRoboto)}>{`${Number(
              tokenBalanceWETH
            ).toFixed(4)} ${tokenName}`}</Typography>
          </Box>
          <Field
            type="input"
            name="bid"
            variant="outlined"
            validate={validatePrice}
            className={classes.rootField}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  icon={
                    <Typography className={classes.inputAdorment} color={'textSecondary'}>
                      {tokenName}
                    </Typography>
                  }
                />
              ),
            }}
            helperText={`$${bidValueAmountUsd}`}
          />

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
            className={clsx(classes.bitBtn, !disabledBid && classes.bitBtnDisabled)}
            disabled={!disabledBid}
          >
            {!isValidBidValueAmount ? (
              <Typography className={classes.bitBtnDisabledText}>{`You don’t have enough ${tokenName}`}</Typography>
            ) : (
              'Place a Bid'
            )}
          </Button>
        </Box>
        <Box mt={4}>
          <Link href={'#'} className={classes.learnLink} underline="none">
            Learn how our auctions work
          </Link>
        </Box>
      </Box>
    </>
  )
}
