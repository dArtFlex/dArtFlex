import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab, Grid } from '@material-ui/core'
import { createSelector } from 'reselect'
import { stateType } from 'stores/reducers'
import { PageWrapper, Popover } from 'common'
import History from './History'
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

const selectWallet = (id: string) =>
  createSelector(
    (store: stateType) => store,
    ({ assets: { assets } }: stateType) => ({ asset: assets?.find((a) => a.tokenId === id) })
  )

const plus30 = 1000 * 60 * 60 * 0.5
const auctionEndTime = new Date().getTime() + plus30

export default function ArtworkDetails() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { id } = useParams<{ id: string }>()
  const { asset } = useSelector(selectWallet(id))

  // constants should be removed when logic will be provided
  const ifAuction = true
  const ifAuctionEnds = false

  const { timer } = useTimer(auctionEndTime)

  const [anchorElExtLink, setAnchorElExtLink] = useState<null | HTMLElement>(null)

  return (
    <PageWrapper>
      <Box className={classes.root}>
        <Box className={classes.previewContainer}>
          <img src={asset?.image} />
          <IconButton className={clsx(classes.expandBtb, classes.borderdIconButton)}>
            <ArrowExpandIcon />
          </IconButton>
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
                  <span>@gianapress</span>
                </Box>
              </Box>
            )}
          </Box>
          <Box className={classes.infoRow} mb={6}>
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                Current Bid
              </Typography>
              <Typography variant={'h2'}>0.44 ETH</Typography>
              <span>$797.63</span>
            </Box>
            <Box>
              <Box className={classes.infoRowIcon}>
                <Typography variant={'body1'}>Auction Ending In </Typography>
                <InfoIcon />
              </Box>

              <Typography variant={'h2'}>{timer}</Typography>
            </Box>
          </Box>
          {ifAuctionEnds && (
            <Box className={classes.warningBox}>
              <Typography component="span" className={classes.warningText}>
                This auction is ending very soon! If you were to place a bid at this time there is a high chance that it
                would result in an error.
              </Typography>
            </Box>
          )}
          <Button
            onClick={() => dispatch(createBidRequest({ tokenId: id, asset }))}
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
          {tab === 2 && <p>Info</p>}
        </Box>

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
