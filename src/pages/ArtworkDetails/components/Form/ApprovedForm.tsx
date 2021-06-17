import React from 'react'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, Link, Button } from '@material-ui/core'
import { Field, InputAdornment } from 'common'
import { InfoIcon } from 'common/icons'
// import { createBidRequest } from 'stores/reducers/auction'
import { selectAsset } from 'stores/selectors'
import appConst from 'config/consts'
import { useStyles } from './styles'
import { IApprovedFormProps, ApprovedFormState } from './types'

const {
  FILTER_VALUES: { LIVE_AUCTION, RESERVE_NOT_MET },
} = appConst

export default function ApprovedForm(props: IApprovedFormProps) {
  const { tokenId, onSubmit } = props
  const { asset } = useSelector(selectAsset(tokenId))
  const classes = useStyles()

  const { values } = useFormikContext<ApprovedFormState>()

  const disabled = false
  const disabledBid = Boolean(values.bid > 0) && Boolean(values.acknowledge) && Boolean(values.agreeTerms)

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.formContant}>
        <Box mb={4}>
          <Typography variant="h1" component="p">
            Place a bid
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
            You must bid at least
          </Typography>
          <Typography className={classes.boldText}>1.00 ETH</Typography>
        </Box>
        <Box mb={8.5} className={classes.priceRow}>
          <Typography variant="body1" color="textSecondary">
            Your Balance
          </Typography>
          <Typography className={classes.boldText}>2.435 ETH</Typography>
        </Box>
        <Field
          type="input"
          name="bid"
          variant="outlined"
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
        />

        <Box mt={2}>
          <Typography className={classes.warningText}>$2185,68</Typography>
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
          onClick={() => {
            if (asset?._status === LIVE_AUCTION || asset?._status === RESERVE_NOT_MET) {
              // dispatch(createBidRequest({ tokenId }))
            }
            onSubmit()
          }}
          variant={'contained'}
          color={'primary'}
          fullWidth
          disableElevation
          className={clsx(classes.bitBtn, !disabledBid && classes.bitBtnDisabled)}
          disabled={!disabledBid}
        >
          {disabled ? (
            <Typography className={classes.bitBtnDisabledText}>You don’t have enough ETH</Typography>
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
  )
}
