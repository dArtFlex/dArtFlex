import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Box, Typography, IconButton, Avatar, Button, Tabs, Tab, Grid } from '@material-ui/core'
import { Popover, Modal, WalletConnect } from 'common'
import { TabHistory, About } from '../../../components'
import { ShareIcon, ExternalLinkIcon, EtherscanIcon, OpenseaIcon, IpfsIcon, MoreHorizontalIcon } from 'common/icons'
import { selectAssetDetails, selectWallet, selectAssetTokenRates, selectBid } from 'stores/selectors'
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

export default function FormBuyDetails(props: IDetailsFormProps) {
  const { onSubmit } = props
  const classes = useStyles()

  const {
    bid: { bidHistory },
  } = useSelector(selectBid())
  const { wallet } = useSelector(selectWallet())
  const {
    assetDetails: { creatorData, marketData, imageData, tokenData, ownerData },
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
            {/*Todo will be implemented in next version*/}
            {/*{marketData ? (*/}
            {/*  <>*/}
            {/*    <IconButton className={classes.borderdIconButton}>*/}
            {/*      <ShareIcon />*/}
            {/*    </IconButton>*/}
            {/*    <IconButton*/}
            {/*      onClick={(event: React.SyntheticEvent<EventTarget>) => {*/}
            {/*        const target = event.currentTarget as HTMLElement*/}
            {/*        setAnchorElExtLink(target)*/}
            {/*      }}*/}
            {/*      className={classes.borderdIconButton}*/}
            {/*    >*/}
            {/*      <ExternalLinkIcon />*/}
            {/*    </IconButton>*/}
            {/*  </>*/}
            {/*) : (*/}
            {/*  <IconButton className={classes.borderdIconButton}>*/}
            {/*    <MoreHorizontalIcon />*/}
            {/*  </IconButton>*/}
            {/*)}*/}
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
              <span>{marketData ? 'Buy Now Price ' : 'Sold for'}</span>
              {marketData?.sold && <span>Sold for</span>}
            </Typography>
            <Typography variant={'h2'}>{`${startPriceToToken} ETH`}</Typography>
            {!marketData && <Typography>{`$${(startPriceToToken / tokenRate).toFixed(2)}`}</Typography>}
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
          variant={'contained'}
          color={'primary'}
          fullWidth
          disableElevation
          className={classes.bitBtn}
        >
          {marketData ? `Buy Now for ${startPriceToToken} ETH` : 'Make offer'}
        </Button>

        <Tabs
          aria-label="info"
          value={tab}
          onChange={(_, newValue) => {
            setTab(newValue)
          }}
          classes={{ indicator: classes.indicator }}
        >
          {tabsItems.map(({ title }) => (
            <Tab key={title} label={title} classes={{ selected: classes.activeTabColor }} />
          ))}
        </Tabs>
        {tab === 0 && (
          <div className={classes.tabContant}>
            <p>{imageData?.description}</p>
          </div>
        )}
        {tab === 1 && <TabHistory history={bidHistory} />}
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
