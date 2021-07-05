import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectAssetDetails, selectWallet } from 'stores/selectors'
// import { createBidRequest } from 'stores/reducers/auction'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab, Grid, Link } from '@material-ui/core'
import { Popover, Modal, WalletConnect, Field, InputAdornment } from 'common'
import { ShareIcon, ExternalLinkIcon, EtherscanIcon, OpenseaIcon, IpfsIcon, BurnIcon, InfoIcon } from 'common/icons'
import { History, About } from '../../components'
import { useTimer } from 'hooks'
import { normalizeDate } from 'utils'
import { ApprovedFormState } from '../../types'
import { useStyles } from './styles'

export default function FormAuction() {
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()

  switch (values.formProgress) {
    case 'details':
      return <FormAuctionDetails onSubmit={() => setFieldValue('formProgress', 'approve')} />
    case 'approve':
      return <FormAuctionApprove />
    default:
      return null
  }
}

function FormAuctionApprove() {
  const classes = useStyles()
  const { values, handleSubmit } = useFormikContext<ApprovedFormState>()

  const disabled = false
  const disabledBid = Boolean(values.bid > 0) && Boolean(values.acknowledge) && Boolean(values.agreeTerms)

  return (
    <>
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
            onClick={() => handleSubmit()}
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
    </>
  )
}

const tabsItems = [
  {
    title: 'Description',
  },
  {
    title: 'History',
  },
  {
    title: 'About Creator',
  },
]

// constants should be removed when logic will be provided
const ethRate = 2511

interface IDetailsFormProps {
  onSubmit: () => void
}

function FormAuctionDetails(props: IDetailsFormProps) {
  const { onSubmit } = props
  const classes = useStyles()
  const { wallet } = useSelector(selectWallet())
  const {
    assetDetails: { creatorData, ownerData, marketData, imageData },
  } = useSelector(selectAssetDetails())

  const endTime = marketData?.end_time ? normalizeDate(marketData?.end_time).getTime() : 0
  const { timer } = useTimer(endTime)
  const burnTime = new Date().getTime() + 1000 * 60 * 60

  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<boolean>(false)
  const [anchorElExtLink, setAnchorElExtLink] = useState<null | HTMLElement>(null)
  const now_time = new Date().getTime()
  const isAuctionExpired = marketData?.end_time && normalizeDate(marketData.end_time).getTime() < now_time
  const isReserveNotMet =
    marketData?.end_time && normalizeDate(marketData.end_time).getTime() < now_time + 1000 * 60 * 60 * 24
  const ifAuctionEnds = marketData?.end_time && normalizeDate(marketData.end_time).getTime() < now_time + 1000 * 60 * 60

  return (
    <>
      <Box pt={14}>
        <Box className={classes.title}>
          <Typography variant={'h2'}>{imageData?.name}</Typography>
          <Box className={classes.titleBtnCotainer}>
            <IconButton className={classes.borderdIconButton}>
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={(event: React.SyntheticEvent<EventTarget>) => {
                const target = event.currentTarget as HTMLElement
                setAnchorElExtLink(target)
              }}
              className={classes.borderdIconButton}
            >
              <ExternalLinkIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.infoRow} mb={6}>
          <Box>
            <Typography variant={'body1'} className={classes.infoTitle}>
              Creator
            </Typography>
            <Box className={classes.avatarBox}>
              <Avatar className={classes.avatar} alt="Avatar" src={creatorData?.profile_image} />
              <span>@{creatorData?.userid}</span>
            </Box>
          </Box>
          {marketData && marketData?.type === 'auction' && (
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                Owned by
              </Typography>
              <Box className={classes.avatarBox}>
                <Avatar className={classes.avatar} alt="Avatar" src={ownerData?.profile_image} />
                <span>{ownerData?.userid !== creatorData?.userid ? `@${ownerData?.userid}` : '@you'}</span>
              </Box>
            </Box>
          )}
        </Box>
        <Box className={classes.infoRow} mb={6}>
          <Box>
            <Typography variant={'body1'} className={classes.infoTitle}>
              <span>{isAuctionExpired ? 'Current Bid' : 'Reserve Price'}</span>
              {isReserveNotMet && <span>Reserve Price</span>}
              {marketData?.sold && <span>Sold for</span>}
            </Typography>
            <Typography variant={'h2'}>
              {`${marketData?.end_price} ETH`}
              {isAuctionExpired ? (marketData?.end_price ? `${marketData?.end_price} ETH` : '-') : ''}
              {marketData?.sold && `${marketData?.end_price} ETH`}
            </Typography>
            <span>
              {marketData?.end_price &&
                `$${new BigNumber(marketData.end_price).multipliedBy(ethRate).toNumber().toFixed(1)}`}

              {isReserveNotMet
                ? marketData?.end_price
                  ? `$${new BigNumber(marketData.end_price).multipliedBy(ethRate).toNumber().toFixed(1)}`
                  : ''
                : ''}
              {marketData?.sold &&
                marketData?.end_price &&
                `$${new BigNumber(marketData.end_price).multipliedBy(ethRate).toNumber().toFixed(1)}`}
            </span>
          </Box>
          {marketData?.end_price && (
            <Box>
              <Box className={classes.infoRowIcon}>
                <Typography variant={'body1'}>Auction Ending In </Typography>
                <InfoIcon />
              </Box>
              <Box
                className={clsx(
                  classes.timerBox,
                  normalizeDate(marketData.end_time).getTime() < burnTime && classes.timerBoxBurn
                )}
              >
                {normalizeDate(marketData.end_time).getTime() < burnTime && (
                  <BurnIcon className={classes.actionBtnIcon} />
                )}
                <Typography
                  className={clsx(normalizeDate(marketData.end_time).getTime() < burnTime && classes.actionBtnBurn)}
                  variant={'h2'}
                >
                  {timer}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        {isReserveNotMet &&
          marketData?.start_price &&
          marketData?.end_price &&
          marketData.start_price !== marketData.end_price && (
            <Box className={classes.warningBox}>
              <Typography component="span" className={classes.warningText}>
                Once a bid has been placed and the reserve price has been met, a 24 hour auction for this artwork will
                begin.
              </Typography>
            </Box>
          )}
        {ifAuctionEnds && (
          <Box className={classes.warningBox}>
            <Typography component="span" className={classes.warningText}>
              This auction is ending very soon! If you were to place a bid at this time there is a high chance that it
              would result in an error.
            </Typography>
          </Box>
        )}

        <Button
          onClick={() => {
            if (wallet) {
              onSubmit()
            } else {
              setOpen(true)
            }
          }}
          variant={ifAuctionEnds ? 'outlined' : 'contained'}
          color={'primary'}
          fullWidth
          disableElevation
          className={classes.bitBtn}
        >
          {ifAuctionEnds ? 'I understand, let me bid anyway' : 'Place a Bid'}
        </Button>

        <Tabs
          aria-label="info"
          value={tab}
          onChange={(_, newValue) => {
            setTab(newValue)
          }}
        >
          {tabsItems.map(({ title }) => (
            <Tab key={title} label={title} />
          ))}
        </Tabs>
        {tab === 0 && (
          <div className={classes.tabContant}>
            <p>{imageData?.description}</p>
          </div>
        )}
        {tab === 1 && <History />}
        {tab === 2 && <About creator={creatorData} />}
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        body={<WalletConnect onClose={() => setOpen(false)} />}
        withAside
      />

      <Popover anchorEl={anchorElExtLink} onClose={() => setAnchorElExtLink(null)}>
        <Box className={classes.externalLinkMenu}>
          <Typography
            variant="body1"
            className={clsx(classes.externalLinkMenuItem, classes.linkTitle)}
            color="textPrimary"
          >
            View on
          </Typography>
          <Grid container direction="column">
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={classes.btnTitle}
              startIcon={<EtherscanIcon />}
            >
              Ethescan
            </Button>
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={classes.btnTitle}
              startIcon={<OpenseaIcon />}
            >
              Opensea
            </Button>
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={classes.btnTitle}
              startIcon={<IpfsIcon />}
            >
              IPFS
            </Button>
          </Grid>
        </Box>
      </Popover>
    </>
  )
}
