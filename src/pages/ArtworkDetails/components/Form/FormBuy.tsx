import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import clsx from 'clsx'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab, Grid, Link } from '@material-ui/core'
import { Popover, Modal, WalletConnect } from 'common'
import { History, About } from '../../components'
import { ShareIcon, ExternalLinkIcon, EtherscanIcon, OpenseaIcon, IpfsIcon, InfoIcon } from 'common/icons'
import { selectAssetDetails, selectWallet, selectAssetTokenRates } from 'stores/selectors'
import { Field } from 'common'
import { ApprovedFormState } from '../../types'
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

interface IDetailsFormProps {
  onSubmit: () => void
}

function FormBuyDetails(props: IDetailsFormProps) {
  const { onSubmit } = props
  const classes = useStyles()
  const { wallet } = useSelector(selectWallet())
  const {
    assetDetails: { creatorData, marketData, imageData },
  } = useSelector(selectAssetDetails())
  const { exchangeRates } = useSelector(selectAssetTokenRates())

  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<boolean>(false)
  const [anchorElExtLink, setAnchorElExtLink] = useState<null | HTMLElement>(null)

  const now_time = new Date().getTime()
  const isReserveNotMet =
    marketData?.end_time && normalizeDate(marketData.end_time).getTime() < now_time - 1000 * 60 * 60 * 24

  const tokenInfo = exchangeRates ? exchangeRates.find((tR) => tR.id === '0x') : null
  const tokenRate = tokenInfo ? tokenInfo?.rateUsd || 0 : 0

  const startPriceToToken =
    marketData?.start_price && tokenInfo
      ? new BigNumber(marketData?.start_price).dividedBy(`10e${18 - 1}`).toNumber()
      : 0

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
        </Box>
        <Box className={classes.infoRow} mb={6}>
          <Box>
            <Typography variant={'body1'} className={classes.infoTitle}>
              <span>Buy Now Price</span>
              {marketData?.sold && <span>Sold for</span>}
            </Typography>
            <Typography variant={'h2'}>{`${startPriceToToken} ETH`}</Typography>
            <span>
              {!isReserveNotMet && marketData?.end_price
                ? `$${new BigNumber(startPriceToToken).multipliedBy(tokenRate).toNumber().toFixed(1)}`
                : null}
              {isReserveNotMet
                ? marketData?.end_price
                  ? `$${new BigNumber(startPriceToToken).multipliedBy(tokenRate).toNumber().toFixed(1)}`
                  : ''
                : ''}
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
          variant={!marketData?.sold ? 'outlined' : 'contained'}
          color={'primary'}
          fullWidth
          disableElevation
          className={classes.bitBtn}
        >
          {`Buy Now for ${startPriceToToken} ETH`}
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

function FormBuyApprove() {
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
