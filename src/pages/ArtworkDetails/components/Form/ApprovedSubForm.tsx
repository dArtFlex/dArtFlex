import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Box, Typography, TextField, FormControlLabel, Checkbox, Link, Button } from '@material-ui/core'
import { InfoIcon } from 'common/icons'
import { createBidRequest } from 'stores/reducers/auction'
import { selectAsset } from 'stores/selectors'
import appConst from 'config/consts'
import { useStyles } from './styles'

interface IApprovedSubFormProps {
  tokenId: string
}

const {
  FILTER_VALUES: { LIVE_AUCTION, RESERVE_NOT_MET },
} = appConst

export default function ApprovedSubForm(props: IApprovedSubFormProps) {
  const { tokenId } = props
  const { asset } = useSelector(selectAsset(tokenId))
  const dispatch = useDispatch()
  const classes = useStyles()
  const disabled = false

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
        <TextField
          variant={'outlined'}
          fullWidth
          InputProps={{
            endAdornment: <Typography className={classes.inputAdorment}>ETH</Typography>,
          }}
        />
        <Box mt={2}>
          <Typography className={classes.warningText}>$2185,68</Typography>
        </Box>
        <Box mt={6} mb={4}>
          <FormControlLabel
            control={<Checkbox name="burn" color={'primary'} />}
            label={
              <Typography className={classes.warningText}>
                I acknowledge that this item has not been reviewed or approved by dArtflex
              </Typography>
            }
          />
        </Box>
        <Box mb={6}>
          <FormControlLabel
            control={<Checkbox name="burn" color={'primary'} />}
            label={
              <Typography className={classes.warningText}>
                {`I agree with dArtflex's `}
                <Link>Terms and Services</Link>
              </Typography>
            }
          />
        </Box>
        <Button
          onClick={() => {
            if (asset?._status === LIVE_AUCTION || asset?._status === RESERVE_NOT_MET) {
              dispatch(createBidRequest({ tokenId }))
            }
          }}
          variant={'contained'}
          color={'primary'}
          fullWidth
          disableElevation
          className={clsx(classes.bitBtn, disabled && classes.bitBtnDisabled)}
          disabled={disabled}
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
