import React, { useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Form } from 'common'
import { useSelector } from 'react-redux'
import { ApprovedFormState } from '../../types'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab, Grid, Link } from '@material-ui/core'
import { Popover, Modal, WalletConnect } from 'common'
import { History, About } from '../../components'
import { useTimer } from 'hooks'
import { ShareIcon, ExternalLinkIcon, EtherscanIcon, OpenseaIcon, IpfsIcon, InfoIcon } from 'common/icons'
import { selectAssetDetails, selectWallet } from 'stores/selectors'
import { Field } from 'common'
import { normalizeDate } from 'utils'
import { useStyles } from './styles'

export default function FormAuction() {
  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()

  switch (values.formProgress) {
    case 'details':
      return <FormBuyDetails onSubmit={() => setFieldValue('formProgress', 'approve')} />
    case 'approve':
      return <FormBuyApprove />
    default:
      return null
  }
}

function FormBuyApprove() {
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
            <Typography className={classes.boldText}>2.435 ETH</Typography>
          </Box>
          <Box mb={8.5} className={classes.priceRow}>
            <Typography variant="body1" color="textSecondary">
              Buy Now Price
            </Typography>
            <Typography className={classes.boldText}>0.1 ETH</Typography>
          </Box>

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
const ifAuctionEnds = false

interface IDetailsFormProps {
  onSubmit: () => void
}

function FormBuyDetails(props: IDetailsFormProps) {
  const { onSubmit } = props
  const classes = useStyles()
  const { wallet } = useSelector(selectWallet())
  const {
    assetDetails: { status, creatorData, ownerData, marketData, imageData },
  } = useSelector(selectAssetDetails())

  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<boolean>(false)
  const [anchorElExtLink, setAnchorElExtLink] = useState<null | HTMLElement>(null)

  const now_time = new Date().getTime()
  const isReserveNotMet =
    marketData?.end_time && normalizeDate(marketData.end_time).getTime() < now_time - 1000 * 60 * 60 * 24

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
              <span>Buy Now Price</span>
              {marketData?.sold && <span>Sold for</span>}
            </Typography>
            <Typography variant={'h2'}>
              {`${marketData?.start_price} ETH`}
              {marketData?.sold && `${marketData.end_price} ETH`}
            </Typography>
            <span>
              {marketData?.end_price &&
                `$${new BigNumber(marketData.end_price).multipliedBy(ethRate).toNumber().toFixed(1)}`}
              {isReserveNotMet
                ? marketData?.end_price
                  ? `$${new BigNumber(marketData.end_price).multipliedBy(ethRate).toNumber().toFixed(1)}}`
                  : ''
                : ''}
              {marketData?.sold &&
                marketData?.start_price &&
                marketData?.end_price &&
                marketData.start_price !== marketData.end_price &&
                `$${new BigNumber(marketData.end_price).multipliedBy(ethRate)}`}
            </span>
          </Box>
        </Box>

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
          Buy Now for 0.1 ETH
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
