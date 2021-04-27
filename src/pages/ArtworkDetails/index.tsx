//@ts-nocheck
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab, Grid } from '@material-ui/core'
import { createSelector } from 'reselect'
import { stateType } from 'stores/reducers'
import { PageWrapper, Popover, Modal, WalletConnect } from 'common'
import { History, About } from './components'
import { useTimer } from 'hooks'
import {
  ShareIcon,
  ExternalLinkIcon,
  ArrowExpandIcon,
  InfoIcon,
  EtherscanIcon,
  OpenseaIcon,
  IpfsIcon,
} from 'common/icons'
import { createBidRequest } from 'stores/reducers/auction'
import { connectMetaMaskRequest } from 'stores/reducers/wallet'
import { useStyles } from './styles'

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

const selectWallet = () =>
  createSelector(
    (store: stateType) => store,
    ({ wallet: { wallet } }: stateType) => ({ wallet })
  )

const selectAssets = (id: string) =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets } }: stateType) => ({ asset: assets?.find((a) => a.tokenId === id) })
  )

const plus30 = 1000 * 60 * 60 * 0.5
const auctionEndTime = new Date().getTime() + plus30
const ethRate = 2511

export default function ArtworkDetails() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { id } = useParams<{ id: string }>()
  const { asset } = useSelector(selectAssets(id))
  const { wallet } = useSelector(selectWallet())

  // constants should be removed when logic will be provided
  const ifAuction = true
  const ifAuctionEnds = false

  const { timer } = useTimer(auctionEndTime)

  const [anchorElExtLink, setAnchorElExtLink] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <PageWrapper>
      <Box className={classes.root}>
        <Box className={classes.outerContainer}>
          <Box className={classes.previewContainer}>
            <img src={asset?.image} />
            <IconButton className={clsx(classes.expandBtb, classes.borderdIconButton)}>
              <ArrowExpandIcon />
            </IconButton>
          </Box>
        </Box>
        <Box pt={14}>
          <Box className={classes.title}>
            <Typography variant={'h2'}>{asset?.name}</Typography>
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
              <Box>
                <Avatar className={classes.avatar} alt="Avatar" src="/images/avatar/1.jpg" />
                <span>@gianapress</span>
              </Box>
            </Box>
            {!ifAuction && (
              <Box>
                <Typography variant={'body1'} className={classes.infoTitle}>
                  Owned by
                </Typography>
                <Box>
                  <Avatar className={classes.avatar} alt="Avatar" src="/images/avatar/1.jpg" />
                  <span>{asset?.owner?.user?.username ? `@${asset.owner.user.username}` : '@you'}</span>
                </Box>
              </Box>
            )}
          </Box>
          <Box className={classes.infoRow} mb={6}>
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                {asset?._status === 'auction' && <span>{asset._currentBit ? 'Current Bid' : 'Reserve Price'}</span>}
                {asset?._status === 'buy_now' && <span>Buy Now Price</span>}
                {asset?._status === 'reserve_price' && <span>Reserve Price</span>}
                {asset?._status === 'sold' && <span>Sold for</span>}
              </Typography>
              <Typography variant={'h2'}>
                {asset?._status === 'auction' && `${asset?._priceReserve || asset?._currentBit} ETH`}
                {asset?._status === 'buy_now' && `${asset?._price} ETH`}
                {asset?._status === 'reserve_price' ? (asset?._priceReserve ? `${asset?._priceReserve} ETH` : '-') : ''}
                {asset?._status === 'sold' && `${asset._sold} ETH`}
              </Typography>
              <span>
                {asset?._status === 'auction' &&
                  `$${(asset?._priceReserve * ethRate).toFixed(1) || (asset?._currentBit * ethRate).toFixed(1)}`}
                {asset?._status === 'buy_now' && `$${(asset?._price * ethRate).toFixed(1)}`}
                {asset?._status === 'reserve_price'
                  ? asset?._priceReserve
                    ? `$${(asset?._priceReserve * ethRate).toFixed(1)}`
                    : ''
                  : ''}
                {asset?._status === 'sold' && `$${asset._sold * ethRate}`}
              </span>
            </Box>
            {asset?._status === 'auction' && asset._currentBit && (
              <Box>
                <Box className={classes.infoRowIcon}>
                  <Typography variant={'body1'}>Auction Ending In </Typography>
                  <InfoIcon />
                </Box>

                <Typography variant={'h2'}>{timer}</Typography>
              </Box>
            )}
          </Box>
          {asset?._status === 'reserve_price' && !asset?._currentBit && asset?._priceReserve !== undefined && (
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
                dispatch(createBidRequest({ tokenId: id, asset }))
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
              <p>{asset?.description}</p>
            </div>
          )}
          {tab === 1 && <History />}
          {tab === 2 && <About />}
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
      </Box>
    </PageWrapper>
  )
}
