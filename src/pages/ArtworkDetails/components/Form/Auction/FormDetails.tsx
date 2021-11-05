import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import {
  selectAssetDetails,
  selectWallet,
  selectAssetTokenRates,
  selectUserRole,
  selectUser,
  selectBid,
  selectListing,
} from 'stores/selectors'
import clsx from 'clsx'
import { Box, Typography, Avatar, Button, Tabs, Tab, Tooltip as MUITooltip, IconButton } from '@material-ui/core'
import { Modal, WalletConnect, ConfirmationModal } from 'common'
import { setLazyMintingData } from 'stores/reducers/minting'
import { chainErrorRequest } from 'stores/reducers/wallet'
import { unlistingRequest, changePriceRequest, resetChangePrice } from 'stores/reducers/listing'
import { BurnIcon, MoreHorizontalIcon } from 'common/icons'
import { TabHistory, TabBids, About } from '../../../components'
import CTAPopover from '../CTAPopover'
import PriceDropModal from '../PriceDropModal'
import { useTimer, useTokenInfo } from 'hooks'
import {
  normalizeDate,
  shortCutName,
  shareWithTwitter,
  getTokenSymbolByContracts,
  guardChain,
  getChainKeyByContract,
  getChainNameById,
} from 'utils'
import { useStyles } from '../styles'
import routes from 'routes'
import { AssetTypes, IBids, UserDataTypes, IChainId } from 'types'
import APP_CONSTS from 'config/consts'
import APP_CONFIG from 'config'
import { walletService } from 'services/wallet_service'

const {
  STATUSES: { MINTED, SOLD },
} = APP_CONSTS

interface IDetailsFormProps {
  onSubmit: (field: string, value: string) => void
}

const tabsItems = [
  {
    title: 'History',
  },
  {
    title: 'Bids and Offers',
  },
  {
    title: 'About Creator',
  },
  {
    title: 'Description',
  },
]

export default function FormDetails(props: IDetailsFormProps) {
  const { onSubmit } = props
  const classes = useStyles()
  const history = useHistory()
  const { url } = useRouteMatch()
  const dispatch = useDispatch()
  const { wallet } = useSelector(selectWallet())
  const { role } = useSelector(selectUserRole())
  const { user } = useSelector(selectUser())
  const {
    listing: { fetchingDropPrice, priceChanged, fetchingUnlist },
  } = useSelector(selectListing())

  const {
    bid: { bidHistory, bids, offers },
  } = useSelector(selectBid())
  const {
    assetDetails: { creatorData, ownerData, marketData, imageData, tokenData, status },
  } = useSelector(selectAssetDetails())
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const makeOfferStatus = status === SOLD || status === MINTED

  const isSamePerson = wallet?.accounts[0] === ownerData?.wallet

  const endTime = marketData?.end_time ? normalizeDate(marketData?.end_time).getTime() : 0
  const { timer } = useTimer(endTime)
  const burnTime = new Date().getTime() + 1000 * 60 * 60

  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<boolean>(false)
  const [anchorElExtLink, setAnchorElExtLink] = useState<null | HTMLElement>(null)
  const [openPriceDropModal, setOpenPriceDropModal] = useState(false)
  const [openUnlistModal, setOpenUnlistModal] = useState(false)

  const now_time = new Date().getTime()
  const isAuctionExpired = marketData?.end_time && normalizeDate(marketData.end_time).getTime() < now_time
  const isReserveNotMet =
    marketData?.end_time && normalizeDate(marketData.end_time).getTime() < now_time + 1000 * 60 * 60 * 24
  const ifAuctionEnds = marketData?.end_time && normalizeDate(marketData.end_time).getTime() < now_time + 1000 * 60 * 60
  const is24HourAction = isReserveNotMet

  const tokenInfo = useTokenInfo(marketData?.sales_token_contract, marketData?.contract)
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
        lazymint: tokenData.lazymint,
      })
    )
    history.push(routes.sellNFT)
  }

  const isBidded = bids && bids.length > 1

  const currentUrl = APP_CONFIG.appUrl + url
  const shareTwitterLink = shareWithTwitter({ url: currentUrl, desc: imageData?.description })

  const tokenSymbol = getTokenSymbolByContracts(tokenData?.contract || '', marketData?.sales_token_contract || '')

  useEffect(() => {
    if (priceChanged) {
      dispatch(resetChangePrice())
      setOpenPriceDropModal(false)
    }
  }, [priceChanged])

  const chainId = walletService.getChainId()
  const onGuardChain = ({ contract, chainId }: { contract: string; chainId: number }) => {
    if (guardChain(contract, chainId)) {
      return true
    }
    const contractToChainId = getChainKeyByContract(contract)
    contractToChainId !== undefined && dispatch(chainErrorRequest(getChainNameById(contractToChainId as IChainId)))
    return false
  }

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
              <span>{creatorData?.wallet !== user?.wallet ? `@${shortCutName(creatorData?.userid)}` : '@you'}</span>
            </Box>
          </Box>
          {tokenData && tokenData.creator !== tokenData.owner && (
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                Owned by
              </Typography>
              <Box className={classes.avatarBox}>
                <Avatar className={classes.avatar} alt="Avatar" src={ownerData?.profile_image} />
                <span>{ownerData?.wallet !== user?.wallet ? `@${shortCutName(ownerData?.userid)}` : '@you'}</span>
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
              {!isAuctionExpired ? `${priceToToken} ${tokenSymbol}` : null}
              {isAuctionExpired ? (marketData?.end_price ? `${priceToToken} ${tokenSymbol}` : '-') : ''}
            </Typography>
            <span>
              {!isAuctionExpired
                ? marketData?.end_price && `$${new BigNumber(priceToToken).multipliedBy(tokenRate).toNumber()}`
                : null}

              {isAuctionExpired && isReserveNotMet
                ? marketData?.end_price
                  ? `$${new BigNumber(priceToToken).multipliedBy(tokenRate).toNumber()}`
                  : ''
                : ''}
            </span>
          </Box>
          {marketData?.sold && (
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                <span>Sold For</span>
              </Typography>
              <Typography variant={'h2'}>{marketData?.sold && `${priceToToken} ${tokenSymbol}`}</Typography>
              <span>
                {marketData?.sold &&
                  marketData?.end_price &&
                  `$${new BigNumber(priceToToken).multipliedBy(tokenRate).toNumber().toFixed(1)}`}
              </span>
            </Box>
          )}
          {!isAuctionExpired && marketData?.end_time && !marketData.sold ? (
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                <span>Auction Ending In</span>
              </Typography>
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
        {!is24HourAction &&
          !isAuctionExpired &&
          marketData?.start_price &&
          marketData?.end_price &&
          marketData.start_price !== marketData.end_price &&
          !isBidded && (
            <Box className={classes.warningBox}>
              <Typography component="span" className={classes.warningText}>
                Once a bid has been placed and the reserve price has been met, this artwork will begin.
              </Typography>
            </Box>
          )}
        {is24HourAction &&
          status !== SOLD &&
          !isAuctionExpired &&
          marketData?.start_price &&
          marketData?.end_price &&
          marketData.start_price !== marketData.end_price && (
            <Box className={classes.warningBox}>
              <Typography component="span" className={classes.warningText}>
                The auction is ending very soon!
              </Typography>
            </Box>
          )}
        {ifAuctionEnds && !isAuctionExpired && status !== SOLD ? (
          <Box className={classes.warningBox}>
            <Typography component="span" className={classes.warningText}>
              If you were to place a bid at this time there is a high chance that it would result in an error.
            </Typography>
          </Box>
        ) : null}

        {!makeOfferStatus ? (
          <MUITooltip
            title={'You own this item'}
            classes={{ tooltip: classes.boldText }}
            disableHoverListener={!isSamePerson}
          >
            <Box>
              <Button
                onClick={() => {
                  if (onGuardChain({ chainId, contract: tokenData?.contract || '' })) {
                    if (isSamePerson) {
                      // Secondary sell
                      return handleListed()
                    }
                    if (wallet) {
                      onSubmit('formProgress', 'auction')
                    } else {
                      setOpen(true)
                    }
                  }
                }}
                variant={ifAuctionEnds ? 'outlined' : 'contained'}
                color={'primary'}
                fullWidth
                disableElevation
                className={classes.bitBtn}
                classes={{ disabled: classes.bitBtnDisabled }}
                disabled={isSamePerson || Boolean(isAuctionExpired)}
              >
                {ifAuctionEnds && !isAuctionExpired ? 'I understand, let me bid anyway' : 'Place a Bid'}
              </Button>
            </Box>
          </MUITooltip>
        ) : (
          <MUITooltip
            title={'You own this item'}
            classes={{ tooltip: classes.boldText }}
            disableHoverListener={!isSamePerson}
          >
            <Box>
              <Button
                onClick={() => {
                  if (onGuardChain({ chainId, contract: tokenData?.contract || '' })) {
                    if (wallet) {
                      onSubmit('formProgress', 'make offer')
                    }
                  }
                }}
                variant={'contained'}
                color={'primary'}
                fullWidth
                disableElevation
                className={classes.bitBtn}
                classes={{ disabled: classes.bitBtnDisabled }}
                disabled={isSamePerson}
              >
                Make offer
              </Button>
            </Box>
          </MUITooltip>
        )}

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
        {tab === 0 && <TabHistory history={bidHistory} />}
        {tab === 1 && (
          <TabBids
            bids={bids as Array<IBids & { userData: UserDataTypes }>}
            offers={offers as Array<IBids & { userData: UserDataTypes }>}
          />
        )}
        {tab === 2 && <About creator={creatorData} />}
        {tab === 3 && (
          <div className={classes.tabContent}>
            <p>{imageData?.description}</p>
          </div>
        )}
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        body={<WalletConnect onClose={() => setOpen(false)} />}
        withAside
      />

      <ConfirmationModal
        open={openUnlistModal}
        onCancel={() => setOpenUnlistModal(false)}
        onSubmit={() => {
          marketData && dispatch(unlistingRequest({ market_id: marketData.id }))
          setOpenUnlistModal(false)
        }}
        title={'Do you want to cancel artwork?'}
        fetching={fetchingUnlist}
        btnCancelText={'Nevermind'}
        btnSubmitText={'Yes, I cancel'}
      />

      <PriceDropModal
        open={openPriceDropModal}
        onCancel={() => setOpenPriceDropModal(false)}
        onSubmit={(value: string) => {
          dispatch(changePriceRequest({ itemId: (tokenData as AssetTypes).id, newPrice: value }))
        }}
        tokenName={tokenSymbol}
        fetching={fetchingDropPrice}
      />

      <CTAPopover
        anchorEl={anchorElExtLink}
        onClose={() => setAnchorElExtLink(null)}
        twitterLink={shareTwitterLink}
        etherscanLink={tokenData?.etherscan}
        IPFSLink={imageData?.image}
        url={currentUrl}
        creator={user?.id === ownerData?.id}
        superAdmin={role === 'ROLE_SUPER_ADMIN'}
        onCancelListing={
          user?.id === ownerData?.id && marketData?.id !== undefined
            ? () => {
                setOpenUnlistModal(true)
                setAnchorElExtLink(null)
              }
            : undefined
        }
        onPriceDrop={
          marketData
            ? () => {
                setOpenPriceDropModal(true)
                setAnchorElExtLink(null)
              }
            : undefined
        }
      />
    </>
  )
}
