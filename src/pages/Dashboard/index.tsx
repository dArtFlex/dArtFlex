import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import routes from 'routes'
import { Box } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { CircularProgressLoader, PageWrapper, CardAsset, CardUploadNew, ConfirmationModal } from 'common'
import {
  CodeIcon,
  FacebookIcon,
  InstagramOutlinedIcon,
  LinkIcon,
  TikTokIcon,
  TwitterIcon,
  WorldIcon,
  YouTubeIcon,
} from 'common/icons'
import { selectUser, selectSearch, selectListing, selectChain, selectWallet } from 'stores/selectors'
import ProfileLayout from 'layouts/ProfileLayout'
import { Aside, ValuesInfo, Empty } from './components'
import { getUserAssetsMetaRequest } from 'stores/reducers/user'
import { setLazyMintingData } from 'stores/reducers/minting'
import { chainErrorRequest } from 'stores/reducers/wallet'
import appConst from 'config/consts'
import { useStyles } from './styles'
import {
  shortCutName,
  getTokenSymbolByContracts,
  guardChain,
  getChainKeyByContract,
  getChainNameById,
  getNativeTokenByChainId,
} from 'utils'
import { useSortedAssets } from './lib'
import { useSearchAssets } from 'hooks'
import { IUserAssets } from './types'
import { IChainId } from 'types'
import { unlistingRequest } from 'stores/reducers/listing'
import { IUserSoldAssets } from 'stores/reducers/user/types'
import BigNumber from 'bignumber.js'
import image from 'common/icons/cover_photo.png'

const { FILTER_VALUES, STATUSES } = appConst

const filterItems = [
  {
    label: 'In Wallet',
    value: FILTER_VALUES.IN_WALLET,
  },
  {
    label: 'Created',
    value: FILTER_VALUES.CREATED,
  },
  {
    label: 'Collected',
    value: FILTER_VALUES.COLLECTED,
  },
  {
    label: 'Sold',
    value: FILTER_VALUES.SOLD,
  },
]

export default function Dashboard() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [filter, setFilter] = useState(FILTER_VALUES.IN_WALLET)
  const { user, userAssets, userCollectedAssets, userSoldAssets, userCreatedAssets, fetchingAssets } = useSelector(
    selectUser()
  )
  const {
    listing: { fetchingUnlist },
  } = useSelector(selectListing())
  const { chainId } = useSelector(selectChain())
  const { wallet } = useSelector(selectWallet())

  const tokenNameNative = getNativeTokenByChainId(chainId) || 'None'

  const { search } = useSelector(selectSearch())
  const searchAssets = useSearchAssets({ assets: userAssets, search })
  const searchCollectedAssets = useSearchAssets({ assets: userCollectedAssets, search })
  const searchSoldAssets = useSearchAssets({ assets: userSoldAssets, search })
  const searchCreatedAssets = useSearchAssets({ assets: userCreatedAssets, search })

  const [openUnlistModal, setOpenUnlistModal] = useState(false)
  const [selectedAssetId, setSelectedAssetId] = useState('')

  const sortedAssets = useSortedAssets({
    userAssets:
      filter === FILTER_VALUES.COLLECTED
        ? searchCollectedAssets
        : filter === FILTER_VALUES.SOLD
        ? searchSoldAssets
        : filter === FILTER_VALUES.CREATED
        ? searchCreatedAssets
        : searchAssets,
    filter,
  })

  if (!user) {
    history.push(routes.home)
    return null
  }

  useEffect(() => {
    const historyState = { ...history }
    if (historyState.location.state && (historyState.location.state as { from: string }).from === routes.createNFT) {
      setFilter(FILTER_VALUES.CREATED)
      historyState.location.state = {}
    }
  })

  useEffect(() => {
    dispatch(getUserAssetsMetaRequest({ chainId, wallet: wallet?.accounts[0], filter }))
  }, [filter, chainId])

  const links = [
    {
      link: user.instagram.length ? `instagram.com/${user.instagram}` : undefined,
      icon: <InstagramOutlinedIcon className={classes.linkIcon} />,
      href: `https://instagram.com/${user.instagram}`,
    },
    {
      link: user.twitter.length ? `twitter.com/${user.twitter}` : undefined,
      icon: <TwitterIcon className={classes.linkIcon} />,
      href: `https://twitter.com/${user.twitter}`,
    },
    {
      link: user.youtube.length ? `${user.youtube}` : undefined,
      icon: <YouTubeIcon className={classes.linkIcon} />,
      href: `${user.youtube}`,
    },
    {
      link: user.facebook.length ? `${user.facebook}` : undefined,
      icon: <FacebookIcon className={classes.linkIcon} />,
      href: `https://facebook.com/${user.facebook}`,
    },
    {
      link: user.tiktok.length ? `${user.tiktok}` : undefined,
      icon: <TikTokIcon className={classes.linkIcon} />,
      href: `https://tiktok.com/@${user.tiktok}`,
    },
    {
      link: user.discord.length ? `${user.discord}` : undefined,
      icon: <CodeIcon className={classes.linkIcon} />,
    },
    {
      link: user.website.length ? `${user.website}` : undefined,
      icon: <WorldIcon className={classes.linkIcon} />,
      href: `${user.website}`,
    },
    {
      link: user.other_url.length ? `${user.other_url}` : undefined,
      icon: <LinkIcon className={classes.linkIcon} />,
      href: `${user.other_url}`,
    },
  ]

  const handleListed = (userAsset: IUserAssets) => {
    dispatch(
      setLazyMintingData({
        data: {
          ...userAsset.imageData,
          royalties: String(userAsset.tokenData.royalty),
        },
        lazyMintItemId: userAsset.tokenData.id,
        lazyMintData: {
          contract: userAsset.tokenData.contract,
          tokenId: userAsset.tokenData.token_id,
          uri: userAsset.tokenData.uri,
          signatures: [userAsset.tokenData.signature],
        },
        lazymint: userAsset.tokenData.lazymint,
      })
    )
    history.push(routes.sellNFT)
  }

  const handleUnlisted = (market_id: string) => {
    dispatch(unlistingRequest({ market_id }))
    dispatch(getUserAssetsMetaRequest({ chainId, wallet: wallet?.accounts[0], filter }))
  }

  const totalSales = userSoldAssets
    .map((a: IUserSoldAssets) => a.current_price)
    .reduce((acc, price) => new BigNumber(acc).plus(price).toString(), '0')
  const totalSalesInToken = new BigNumber(totalSales).dividedBy(`10e${18 - 1}`).toString()
  const totalRevenueInToken = new BigNumber(totalSalesInToken)
    .minus(new BigNumber(totalSalesInToken).dividedBy(100).multipliedBy(2.5))
    .toString()

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
      <PageWrapper className={classes.wrapper}>
        <ProfileLayout
          coverURL={user.cover_image !== 'blank' ? user.cover_image : image}
          aside={
            <Aside
              avatar={user.profile_image}
              name={user.fullname}
              userName={shortCutName(user.userid)}
              walletAddress={user.wallet}
              content={user.overview}
              links={links.filter((l) => l.link !== undefined)}
              joinedToArtworks={`Joined ${moment(user.created_at).format('MMMM, YYYY')}`}
            />
          }
        >
          <Box className={classes.container}>
            <ToggleButtonGroup
              classes={{ root: classes.toggleGroup }}
              exclusive
              onChange={(_, value) => {
                if (value) setFilter(value)
              }}
            >
              {filterItems.map(({ label, value }) => {
                return (
                  <ToggleButton key={value} value={value} selected={filter === value} className={classes.toggleButton}>
                    {label}
                  </ToggleButton>
                )
              })}
            </ToggleButtonGroup>

            {filter === FILTER_VALUES.SOLD && (
              <Box className={classes.container}>
                <Box className={classes.inlineFlex}>
                  <ValuesInfo
                    totalSalesInToken={totalSalesInToken}
                    totalRevenueInToken={totalRevenueInToken}
                    tokenName={tokenNameNative}
                  />
                </Box>
              </Box>
            )}

            <Box className={classes.grid} mt={2}>
              {fetchingAssets ? (
                <CircularProgressLoader />
              ) : (
                <>
                  {filter === FILTER_VALUES.CREATED && <CardUploadNew onClick={() => history.push(routes.createNFT)} />}
                  {!userAssets?.length && <Empty />}
                  {sortedAssets
                    ? sortedAssets.map((userAsset, i) => (
                        <CardAsset
                          key={i}
                          asset={{
                            ...userAsset,
                            tokenSymbol: getTokenSymbolByContracts(
                              userAsset.tokenData.contract || '',
                              userAsset.sales_token_contract || ''
                            ),
                          }}
                          userWallet={user?.wallet}
                          withLabel
                          withAction={Boolean(
                            userAsset.status === STATUSES.LISTED || userAsset?._status === STATUSES.LISTED
                          )}
                          button={{
                            onListed: () =>
                              onGuardChain({ chainId, contract: userAsset.tokenData.contract }) &&
                              handleListed(userAsset),
                            onSell: () => {
                              if (Boolean(userAsset?._status !== STATUSES.LISTED))
                                onGuardChain({ chainId, contract: userAsset.tokenData.contract }) &&
                                  handleListed(userAsset)
                            },
                          }}
                          menu={{
                            onUnlisted: () => {
                              setSelectedAssetId(String(userAsset.id))
                              setOpenUnlistModal(true)
                            },
                          }}
                        />
                      ))
                    : null}
                </>
              )}
            </Box>
          </Box>
        </ProfileLayout>
      </PageWrapper>

      <ConfirmationModal
        open={openUnlistModal}
        onCancel={() => setOpenUnlistModal(false)}
        onSubmit={() => {
          handleUnlisted(selectedAssetId)
          setOpenUnlistModal(false)
        }}
        title={'Do you want to cancel artwork?'}
        fetching={fetchingUnlist}
        btnCancelText={'Nevermind'}
        btnSubmitText={'Yes, I cancel'}
      />
    </>
  )
}
