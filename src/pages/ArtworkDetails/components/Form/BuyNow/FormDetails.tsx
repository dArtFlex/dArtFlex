import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import clsx from 'clsx'
import {
  Box,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Grid,
  Tooltip as MUITooltip,
  IconButton,
  Divider,
  Link,
} from '@material-ui/core'
import { Popover, Modal, WalletConnect } from 'common'
import { TabHistory, About, TabBids } from '../../../components'
import {
  EtherscanIcon,
  OpenseaIcon,
  IpfsIcon,
  MoreHorizontalIcon,
  LinkIcon,
  ArrowCurveIcon,
  CancelIcon,
  TwitterIcon,
  EyeIcon,
  ReportIcon,
} from 'common/icons'
import {
  selectAssetDetails,
  selectWallet,
  selectAssetTokenRates,
  selectBid,
  selectUser,
  selectUserRole,
} from 'stores/selectors'
import { normalizeDate, shortCutName, shareWithTwitter } from 'utils'
import { useStyles } from '../styles'
import { IBids, UserDataTypes } from 'types'
import appConst from '../../../../../config/consts'
import APP_CONFIG from 'config'

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
  const { url } = useRouteMatch()

  const {
    bid: { bidHistory, bids, offers },
  } = useSelector(selectBid())
  const { wallet } = useSelector(selectWallet())
  const { user } = useSelector(selectUser())
  const { role } = useSelector(selectUserRole())
  const {
    assetDetails: { creatorData, marketData, imageData, tokenData, ownerData, status },
  } = useSelector(selectAssetDetails())
  const { exchangeRates } = useSelector(selectAssetTokenRates())
  const makeOfferStatus = status === SOLD || status === MINTED

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

  const shareTwitterLink = shareWithTwitter({ url: APP_CONFIG.baseURL + url, desc: imageData?.description })

  function getPriceStatusHeader() {
    if (status === MINTED) {
      return 'Reserve price'
    } else if (status === SOLD) {
      return 'Sold for'
    } else {
      return 'Buy now Price'
    }
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
        <Box className={classes.infoRow}>
          <Box>
            <Typography variant={'body1'} className={classes.infoTitle}>
              <span>{getPriceStatusHeader()}</span>
            </Typography>
            <Typography variant={'h2'}>{status === MINTED ? '-' : `${startPriceToToken} ETH`}</Typography>
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
        {!makeOfferStatus ? (
          <MUITooltip
            title={'You own this item'}
            classes={{ tooltip: classes.boldText }}
            disableHoverListener={user?.id !== ownerData?.id}
          >
            <Box>
              <Button
                onClick={() => {
                  if (wallet) {
                    onSubmit('formProgress', 'buy')
                  } else {
                    setOpen(true)
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
                {`Buy Now for ${startPriceToToken} ETH`}
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
                  if (wallet) {
                    onSubmit('formProgress', 'make offer')
                  } else {
                    setOpen(true)
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
              variant={'text'}
              color={'primary'}
              disableElevation
              className={classes.btnTitle}
              startIcon={<TwitterIcon className={classes.linkIcon} />}
            >
              <Link underline="none" href={shareTwitterLink} target="_blank" className={classes.shareLink}>
                Share with Twitter
              </Link>
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
