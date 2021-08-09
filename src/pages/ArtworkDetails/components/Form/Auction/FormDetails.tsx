import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  selectAssetDetails,
  selectWallet,
  selectAssetTokenRates,
  selectUserRole,
  selectUser,
  selectBid,
} from 'stores/selectors'
import clsx from 'clsx'
import { Box, Typography, Avatar, Button, Tabs, Tab, Grid, Divider } from '@material-ui/core'
import { Popover, Modal, WalletConnect, Tooltip } from 'common'
import { setLazyMintingData } from 'stores/reducers/minting'
import {
  TwitterIcon,
  LinkIcon,
  EtherscanIcon,
  OpenseaIcon,
  IpfsIcon,
  BurnIcon,
  EyeIcon,
  ReportIcon,
  ArrowCurveIcon,
  CancelIcon,
} from 'common/icons'
import { TabHistory, TabBids, About } from '../../../components'
import { useTimer, useTokenInfo } from 'hooks'
import { normalizeDate } from 'utils'
import { useStyles } from '../styles'
import routes from 'routes'
import { IBids, UserDataTypes } from 'types'

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
    title: 'Bids',
  },
  {
    title: 'About Creator',
  },
]

export default function FormDetails(props: IDetailsFormProps) {
  const { onSubmit } = props
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { wallet } = useSelector(selectWallet())
  const { role } = useSelector(selectUserRole())
  const { user } = useSelector(selectUser())

  const {
    bid: { bidHistory, bids },
  } = useSelector(selectBid())
  const {
    assetDetails: { creatorData, ownerData, marketData, imageData, tokenData },
  } = useSelector(selectAssetDetails())
  const { exchangeRates } = useSelector(selectAssetTokenRates())

  const isSamePerson = wallet?.accounts[0] === ownerData?.wallet

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
  const currentPriceToToken =
    marketData?.current_price && tokenInfo?.decimals
      ? new BigNumber(marketData?.current_price).dividedBy(`10e${tokenInfo?.decimals - 1}`).toNumber()
      : 0
  const priceToToken = currentPriceToToken || startPriceToToken

  const handleListed = () => {
    if (!tokenData || !imageData) {
      return
    }
    dispatch(
      setLazyMintingData({
        data: {
          name: imageData.name as string,
          image: imageData.image as string,
          image_data: imageData.image_data as string,
          attribute: imageData.attribute as string,
          description: imageData.description as string,
          royalties: String(tokenData.royalty),
        },
        lazyMintItemId: tokenData.id,
        lazyMintData: {
          contract: tokenData.contract,
          tokenId: tokenData.token_id,
          uri: tokenData.uri,
          signatures: [tokenData.signature],
        },
      })
    )
    history.push(routes.sellNFT)
  }

  return (
    <>
      <Box pt={14}>
        <Box className={classes.title}>
          <Typography variant={'h2'}>{imageData?.name}</Typography>
          <Box className={classes.titleBtnCotainer}>
            {/*Todo will be implemented in next version*/}
            {/*<IconButton*/}
            {/*  */}
            {/*  onClick={(event: React.SyntheticEvent<EventTarget>) => {*/}
            {/*    const target = event.currentTarget as HTMLElement*/}
            {/*    setAnchorElExtLink(target)*/}
            {/*  }}*/}
            {/*  className={classes.borderdIconButton}*/}
            {/*>*/}
            {/*  <MoreHorizontalIcon />*/}
            {/*</IconButton>*/}
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
        <Box className={clsx(classes.infoRowMobile, classes.infoRow)} mb={6}>
          <Box>
            <Typography variant={'body1'} className={classes.infoTitle}>
              <span>{isAuctionExpired && isReserveNotMet ? 'Reserve Price' : 'Current Bid'}</span>
            </Typography>
            <Typography variant={'h2'}>
              {!isAuctionExpired ? `${priceToToken} ETH` : null}
              {isAuctionExpired ? (marketData?.end_price ? `${priceToToken} ETH` : '-') : ''}
            </Typography>
            <span>
              {!isAuctionExpired
                ? marketData?.end_price &&
                  `$${new BigNumber(priceToToken).multipliedBy(tokenRate).toNumber().toFixed(1)}`
                : null}

              {isAuctionExpired && isReserveNotMet
                ? marketData?.end_price
                  ? `$${new BigNumber(priceToToken).multipliedBy(tokenRate).toNumber().toFixed(1)}`
                  : ''
                : ''}
            </span>
          </Box>
          {marketData?.sold && (
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                <span>Sold For</span>
              </Typography>
              <Typography variant={'h2'}>{marketData?.sold && `${priceToToken} ETH`}</Typography>
              <span>
                {marketData?.sold &&
                  marketData?.end_price &&
                  `$${new BigNumber(priceToToken).multipliedBy(tokenRate).toNumber().toFixed(1)}`}
              </span>
            </Box>
          )}
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
            if (isSamePerson) {
              // Secondary sell
              return handleListed()
            }
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
          classes={{ disabled: classes.bitBtnDisabled }}
          disabled={!isSamePerson && Boolean(isAuctionExpired)}
        >
          {ifAuctionEnds && !isAuctionExpired
            ? 'I understand, let me bid anyway'
            : isSamePerson
            ? 'Sell'
            : 'Place a Bid'}
        </Button>

        <Tabs
          aria-label="info"
          value={tab}
          onChange={(_, newValue) => {
            setTab(newValue)
          }}
          classes={{ indicator: classes.indicator, fixed: classes.tabsOverflow }}
        >
          {tabsItems.map(({ title }) => (
            <Tab key={title} label={title} classes={{ selected: classes.tabSelected }} />
          ))}
        </Tabs>
        {tab === 0 && (
          <div className={classes.tabContant}>
            <p>{imageData?.description}</p>
          </div>
        )}
        {tab === 1 && <TabHistory history={bidHistory} />}
        {tab === 2 && <TabBids history={bids as Array<IBids & { userData: UserDataTypes }>} />}
        {tab === 3 && <About creator={creatorData} />}
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
            {user?.id === creatorData?.id && (
              <>
                <Button
                  onClick={() => console.log('todo')}
                  variant={'text'}
                  color={'primary'}
                  disableElevation
                  className={classes.btnTitle}
                  startIcon={<ArrowCurveIcon />}
                >
                  Price Drop
                </Button>
                <Button
                  onClick={() => console.log('todo')}
                  variant={'text'}
                  color={'primary'}
                  disableElevation
                  className={clsx(classes.btnTitle, classes.btnTitleRed)}
                  startIcon={<CancelIcon />}
                >
                  Cancel Listing
                </Button>
                <Divider />
              </>
            )}
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
            {role === 'ROLE_SUPER_ADMIN' && (
              <>
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
              </>
            )}
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
