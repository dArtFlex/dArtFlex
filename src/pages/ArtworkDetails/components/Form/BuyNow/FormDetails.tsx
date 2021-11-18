import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Box, Typography, Button, Tabs, Tab, Tooltip as MUITooltip, IconButton } from '@material-ui/core'
import { Modal, WalletConnect, ConfirmationModal } from 'common'
import { TabHistory, About, TabBids } from '../../../components'
import UserBox from '../UserBox'
import CTAPopover from '../CTAPopover'
import PriceDropModal from '../PriceDropModal'
import { MoreHorizontalIcon } from 'common/icons'
import {
  selectAssetDetails,
  selectWallet,
  selectAssetTokenRates,
  selectBid,
  selectUser,
  selectUserRole,
  selectListing,
} from 'stores/selectors'
import { unlistingRequest, changePriceRequest, resetChangePrice } from 'stores/reducers/listing'
import { chainErrorRequest } from 'stores/reducers/wallet'
import { normalizeDate, shareWithTwitter, guardChain, getChainKeyByContract, getChainNameById } from 'utils'
import { useStyles } from '../styles'
import { IBids, UserDataTypes, AssetTypes, IChainId } from 'types'
import appConst from '../../../../../config/consts'
import APP_CONFIG from 'config'
import { useTokenInfo } from 'hooks'
import { walletService } from 'services/wallet_service'

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

const {
  STATUSES: { MINTED, SOLD },
} = appConst

export default function FormBuyDetails(props: IDetailsFormProps) {
  const { onSubmit } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { url } = useRouteMatch()

  const {
    bid: { bidHistory, bids, offers },
  } = useSelector(selectBid())
  const { wallet } = useSelector(selectWallet())
  const { user } = useSelector(selectUser())
  const { role } = useSelector(selectUserRole())
  const {
    listing: { fetchingDropPrice, priceChanged, fetchingUnlist },
  } = useSelector(selectListing())
  const {
    assetDetails: { creatorData, marketData, imageData, tokenData, ownerData, status },
  } = useSelector(selectAssetDetails())
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const makeOfferStatus = status === SOLD || status === MINTED

  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<boolean>(false)
  const [anchorElExtLink, setAnchorElExtLink] = useState<null | HTMLElement>(null)
  const [openPriceDropModal, setOpenPriceDropModal] = useState(false)
  const [openUnlistModal, setOpenUnlistModal] = useState(false)

  const now_time = new Date().getTime()
  const isReserveNotMet =
    marketData?.end_time && normalizeDate(marketData.end_time).getTime() < now_time - 1000 * 60 * 60 * 24

  const tokenInfo = exchangeRates ? exchangeRates.find((tR) => tR.id === '0x') : null
  const tokenRate = tokenInfo ? tokenInfo?.rateUsd || 0 : 0

  const startPriceToToken =
    marketData?.start_price && tokenInfo
      ? new BigNumber(marketData?.start_price).dividedBy(`10e${18 - 1}`).toNumber()
      : 0

  const currentUrl = APP_CONFIG.appUrl + url
  const shareTwitterLink = shareWithTwitter({ url: currentUrl, desc: imageData?.description })

  const token = useTokenInfo(marketData?.sales_token_contract, marketData?.contract)
  const tokenName = token?.symbol || ''

  function getPriceStatusHeader() {
    if (status === MINTED) {
      return 'Reserve price'
    } else if (status === SOLD) {
      return 'Sold for'
    } else {
      return 'Buy now Price'
    }
  }

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
            {creatorData && (
              <UserBox
                userImage={creatorData.profile_image}
                wallet={creatorData.wallet}
                userId={creatorData?.wallet !== user?.wallet ? creatorData?.userid : 'you'}
              />
            )}
          </Box>
          {tokenData && tokenData.creator !== tokenData.owner && (
            <Box>
              <Typography variant={'body1'} className={classes.infoTitle}>
                Owned by
              </Typography>
              {ownerData && (
                <UserBox
                  userImage={ownerData.profile_image}
                  wallet={ownerData.wallet}
                  userId={ownerData?.wallet !== user?.wallet ? ownerData?.userid : 'you'}
                />
              )}
            </Box>
          )}
        </Box>
        <Box className={classes.infoRow}>
          <Box>
            <Typography variant={'body1'} className={classes.infoTitle}>
              <span>{getPriceStatusHeader()}</span>
            </Typography>
            <Typography variant={'h2'}>{status === MINTED ? '-' : `${startPriceToToken} ${tokenName}`}</Typography>
            <span>
              {!isReserveNotMet && marketData?.end_price
                ? `$${new BigNumber(startPriceToToken).multipliedBy(tokenRate).toNumber()}`
                : null}
              {isReserveNotMet
                ? marketData?.end_price
                  ? `$${new BigNumber(startPriceToToken).multipliedBy(tokenRate).toNumber()}`
                  : ''
                : ''}
            </span>
          </Box>
        </Box>
        {!makeOfferStatus ? (
          <MUITooltip
            title={'You own this item'}
            classes={{ tooltip: classes.boldText }}
            disableHoverListener={user?.id !== ownerData?.id}
          >
            <Box>
              <Button
                onClick={() => {
                  if (onGuardChain({ chainId, contract: tokenData?.contract || '' })) {
                    if (wallet) {
                      onSubmit('formProgress', 'buy')
                    } else {
                      setOpen(true)
                    }
                  }
                }}
                variant={'contained'}
                color={'primary'}
                fullWidth
                disableElevation
                disabled={user?.id === ownerData?.id}
                className={classes.bitBtn}
                classes={{ disabled: classes.bitBtnDisabled }}
              >
                {`Buy Now for ${startPriceToToken} ${tokenName}`}
              </Button>
            </Box>
          </MUITooltip>
        ) : (
          <MUITooltip
            title={'You own this item'}
            classes={{ tooltip: classes.boldText }}
            disableHoverListener={user?.id !== ownerData?.id}
          >
            <Box>
              <Button
                onClick={() => {
                  if (onGuardChain({ chainId, contract: tokenData?.contract || '' })) {
                    if (wallet) {
                      onSubmit('formProgress', 'make offer')
                    } else {
                      setOpen(true)
                    }
                  }
                }}
                variant={'contained'}
                color={'primary'}
                fullWidth
                disableElevation
                disabled={user?.id === ownerData?.id}
                className={classes.bitBtn}
                classes={{ disabled: classes.bitBtnDisabled }}
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
            <Tab key={title} label={title} classes={{ selected: classes.activeTabColor }} />
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
        tokenName={tokenName}
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
