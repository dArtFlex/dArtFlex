import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectAssetDetails, selectWallet, selectAssetTokenRates } from 'stores/selectors'
import clsx from 'clsx'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab, Grid, Divider } from '@material-ui/core'
import { Popover, Modal, WalletConnect, Tooltip } from 'common'
import {
  MoreHorizontalIcon,
  TwitterIcon,
  LinkIcon,
  EtherscanIcon,
  OpenseaIcon,
  IpfsIcon,
  BurnIcon,
  EyeIcon,
  ReportIcon,
} from 'common/icons'
import { History, About } from '../../../components'
import { useTimer, useTokenInfo } from 'hooks'
import { normalizeDate } from 'utils'
import { useStyles } from '../styles'

interface IDetailsFormProps {
  onSubmit: () => void
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

export default function FormDetails(props: IDetailsFormProps) {
  const { onSubmit } = props
  const classes = useStyles()
  const { wallet } = useSelector(selectWallet())
  const {
    assetDetails: { creatorData, ownerData, marketData, imageData, tokenData },
  } = useSelector(selectAssetDetails())
  const { exchangeRates } = useSelector(selectAssetTokenRates())

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

  const tokenInfo = useTokenInfo(marketData?.sales_token_contract)
  const tokenRate = exchangeRates
    ? exchangeRates.find((tR) => tokenInfo?.id && tR.id === tokenInfo.id)?.rateUsd || 0
    : 0

  const startPriceToToken =
    marketData?.start_price && tokenInfo?.decimals
      ? new BigNumber(marketData?.start_price).dividedBy(`10e${tokenInfo?.decimals - 1}`).toNumber()
      : 0

  return (
    <>
      <Box pt={14}>
        <Box className={classes.title}>
          <Typography variant={'h2'}>{imageData?.name}</Typography>
          <Box className={classes.titleBtnCotainer}>
            <IconButton
              onClick={(event: React.SyntheticEvent<EventTarget>) => {
                const target = event.currentTarget as HTMLElement
                setAnchorElExtLink(target)
              }}
              className={classes.borderdIconButton}
            >
              <MoreHorizontalIcon />
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
          {tokenData && tokenData.creator !== tokenData.owner && (
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
              <span>{isAuctionExpired && isReserveNotMet ? 'Reserve Price' : 'Current Bid'}</span>
              {marketData?.sold && <span>Sold for</span>}
            </Typography>
            <Typography variant={'h2'}>
              {!isAuctionExpired ? `${startPriceToToken} ETH` : null}
              {isAuctionExpired ? (marketData?.end_price ? `${startPriceToToken} ETH` : '-') : ''}
              {marketData?.sold && `${startPriceToToken} ETH`}
            </Typography>
            <span>
              {!isAuctionExpired
                ? marketData?.end_price &&
                  `$${new BigNumber(startPriceToToken).multipliedBy(tokenRate).toNumber().toFixed(1)}`
                : null}

              {isAuctionExpired && isReserveNotMet
                ? marketData?.end_price
                  ? `$${new BigNumber(startPriceToToken).multipliedBy(tokenRate).toNumber().toFixed(1)}`
                  : ''
                : ''}
              {marketData?.sold &&
                marketData?.end_price &&
                `$${new BigNumber(startPriceToToken).multipliedBy(tokenRate).toNumber().toFixed(1)}`}
            </span>
          </Box>
          {!isAuctionExpired && marketData?.end_time ? (
            <Box>
              <Tooltip text={`Auction Ending In`} desc={`...`} className={classes.tooltip} />

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
          ) : null}
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
        {ifAuctionEnds && !isAuctionExpired ? (
          <Box className={classes.warningBox}>
            <Typography component="span" className={classes.warningText}>
              This auction is ending very soon! If you were to place a bid at this time there is a high chance that it
              would result in an error.
            </Typography>
          </Box>
        ) : null}

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
          disabled={Boolean(isAuctionExpired)}
        >
          {ifAuctionEnds && !isAuctionExpired ? 'I understand, let me bid anyway' : 'Place a Bid'}
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
        <Box>
          <Grid container direction="column">
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={classes.btnTitle}
              startIcon={<TwitterIcon className={classes.linkIcon} />}
            >
              Share with Twitter
            </Button>
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={classes.btnTitle}
              startIcon={<LinkIcon className={classes.linkIcon} />}
            >
              Copy link
            </Button>
            <Divider />
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={classes.btnTitle}
              startIcon={<EtherscanIcon />}
            >
              View on Etherscan
            </Button>
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={classes.btnTitle}
              startIcon={<IpfsIcon />}
            >
              View on IPFS
            </Button>
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={classes.btnTitle}
              startIcon={<OpenseaIcon />}
            >
              View on Opensea
            </Button>
            <Divider />
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={clsx(classes.btnTitle, classes.btnTitleGreen)}
              startIcon={<EyeIcon className={classes.linkIconGreen} />}
            >
              Unban Work
            </Button>
            <Divider />
            <Button
              onClick={() => console.log('todo')}
              variant={'text'}
              color={'primary'}
              disableElevation
              className={clsx(classes.btnTitle, classes.btnTitleRed)}
              startIcon={<ReportIcon />}
            >
              Report
            </Button>
          </Grid>
        </Box>
      </Popover>
    </>
  )
}
