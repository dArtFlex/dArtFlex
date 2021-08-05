import React from 'react'
import { useStyles } from '../styles'
import { useFormikContext } from 'formik'
import { ApprovedFormState } from '../../../types'
import { useSelector } from 'react-redux'
import { selectAssetDetails, selectAssetTokenRates, selectUser, selectWallet } from '../../../../../stores/selectors'
import { Box, Button, IconButton, Link, Typography } from '@material-ui/core'
import { ArrowLeftIcon } from '../../../../../common/icons'
import { Field, Tooltip } from '../../../../../common'
import clsx from 'clsx'

interface IFormMakeOffer {
  onSubmit: () => void
}

export default function FormMakeOffer(props: IFormMakeOffer) {
  const classes = useStyles()
  const { onSubmit } = props
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()
  const { wallet } = useSelector(selectWallet())
  const { user } = useSelector(selectUser())
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const tokenInfo = exchangeRates ? exchangeRates.find((tR) => tR.id === '0x') : null
  const tokenBalanceETH = tokenInfo ? wallet?.balance || 0 : 0

  const {
    assetDetails: { marketData, tokenData },
  } = useSelector(selectAssetDetails())

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
        <Box mb={8.5} className={classes.priceRow}>
          <Typography variant="body1" color="textSecondary">
            Buy Now Price
          </Typography>
          <Box mt={2}>
            {/*<Typography*/}
            {/*  className={clsx(classes.tokenAmount, classes.fontFamilyRoboto)}*/}
            {/*>{`${startPriceToToken} ETH`}</Typography>*/}
            {/*<Typography*/}
            {/*  className={clsx(classes.tokenAmountUsd, classes.fontFamilyRoboto)}*/}
            {/*>{`$${priceToUsd}`}</Typography>*/}
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
          className={clsx(classes.bitBtn)}
          // disabled={!disabledBuy}
        >
          {/*{!isValidValueAmount ? (*/}
          {/*  <Typography className={classes.bitBtnDisabledText}>You don’t have enough ETH</Typography>*/}
          {/*) : (*/}
          {/*  `Buy Now for ${startPriceToToken} ETH`*/}
          {/*)}*/}
        </Button>
      </Box>
    </Box>
  )
}
