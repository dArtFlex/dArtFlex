//@ts-nocheck
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab, Grid } from '@material-ui/core'
import { Popover, Modal, WalletConnect } from 'common'
import { History, About } from '../../components'
import { useTimer } from 'hooks'
import { ShareIcon, ExternalLinkIcon, InfoIcon, EtherscanIcon, OpenseaIcon, IpfsIcon } from 'common/icons'
import { selectAsset, selectWallet } from 'stores/selectors'
import appConst from 'config/consts'
import { useStyles } from './styles'

const {
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD },
} = appConst

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
const plus30 = 1000 * 60 * 60 * 0.5
const auctionEndTime = new Date().getTime() + plus30
const ethRate = 2511
const ifAuction = true
const ifAuctionEnds = false

interface IDetailsFormProps {
  onSubmit: () => void
}

export default function DetailsForm(props: IDetailsFormProps) {
  const { onSubmit } = props
  const classes = useStyles()
  const { id } = useParams<{ id: string }>()
  const { asset } = useSelector(selectAsset(id))
  const { wallet } = useSelector(selectWallet())
  const { timer } = useTimer(auctionEndTime)

  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<boolean>(false)
  const [anchorElExtLink, setAnchorElExtLink] = useState<null | HTMLElement>(null)

  return (
    <>
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
              {asset?._status === LIVE_AUCTION && <span>{asset._currentBit ? 'Current Bid' : 'Reserve Price'}</span>}
              {asset?._status === BUY_NOW && <span>Buy Now Price</span>}
              {asset?._status === RESERVE_NOT_MET && <span>Reserve Price</span>}
              {asset?._status === SOLD && <span>Sold for</span>}
            </Typography>
            <Typography variant={'h2'}>
              {asset?._status === LIVE_AUCTION && `${asset?._priceReserve || asset?._currentBit} ETH`}
              {asset?._status === BUY_NOW && `${asset?._price} ETH`}
              {asset?._status === RESERVE_NOT_MET ? (asset?._priceReserve ? `${asset?._priceReserve} ETH` : '-') : ''}
              {asset?._status === SOLD && `${asset._sold} ETH`}
            </Typography>
            <span>
              {asset?._status === LIVE_AUCTION &&
                `$${(asset?._priceReserve * ethRate).toFixed(1) || (asset?._currentBit * ethRate).toFixed(1)}`}
              {asset?._status === BUY_NOW && `$${(asset?._price * ethRate).toFixed(1)}`}
              {asset?._status === RESERVE_NOT_MET
                ? asset?._priceReserve
                  ? `$${(asset?._priceReserve * ethRate).toFixed(1)}`
                  : ''
                : ''}
              {asset?._status === SOLD && `$${asset._sold * ethRate}`}
            </span>
          </Box>
          {asset?._status === LIVE_AUCTION && asset._currentBit && (
            <Box>
              <Box className={classes.infoRowIcon}>
                <Typography variant={'body1'}>Auction Ending In </Typography>
                <InfoIcon />
              </Box>

              <Typography variant={'h2'}>{timer}</Typography>
            </Box>
          )}
        </Box>
        {asset?._status === RESERVE_NOT_MET && !asset?._currentBit && asset?._priceReserve !== undefined && (
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
    </>
  )
}
