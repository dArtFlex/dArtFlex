import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import routes from 'routes'
import { Box } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { CircularProgressLoader, PageWrapper, CardAsset, CardUploadNew } from 'common'
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
import { selectUser, selectSearch } from 'stores/selectors'
import ProfileLayout from 'layouts/ProfileLayout'
import { Aside, ValuesInfo, Empty } from './components'
import { getUserAssetsRequest } from 'stores/reducers/user'
import { setLazyMintingData } from 'stores/reducers/minting'
import appConst from 'config/consts'
import { useStyles } from './styles'
import { shortCutName, shortCutWallet } from 'utils'
import { useSortedAssets } from './lib'
import { useSearchAssets } from 'hooks'
import { IUserAssets } from './types'
import { unlistingRequest } from 'stores/reducers/listing'
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
  const { user, userAssets, userCollectedAssets, userSolddAssets, fetching } = useSelector(selectUser())

  const { search } = useSelector(selectSearch())
  const searchAssets = useSearchAssets({ assets: userAssets, search })
  const searchCollectedAssets = useSearchAssets({ assets: userCollectedAssets, search })
  const searchSoldAssets = useSearchAssets({ assets: userSolddAssets, search })
  const sortedAssets = useSortedAssets({
    userAssets:
      filter === FILTER_VALUES.COLLECTED
        ? searchCollectedAssets
        : filter === FILTER_VALUES.SOLD
        ? searchSoldAssets
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
    dispatch(getUserAssetsRequest())
  }, [])

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
    dispatch(getUserAssetsRequest())
  }

  const totalSales = userSolddAssets
    .map((a: { current_price: string }) => a.current_price)
    .reduce((acc, price) => new BigNumber(acc).plus(price).toString(), '0')
  const totalSalesToEth = new BigNumber(totalSales)
    .dividedBy(`10e${18 - 1}`)
    .toNumber()
    .toFixed(4)

  return (
    <PageWrapper className={classes.wrapper}>
      <ProfileLayout
        coverURL={user.cover_image !== 'blank' ? user.cover_image : image}
        aside={
          <Aside
            avatar={user.profile_image}
            name={user.fullname}
            userName={shortCutName(user.userid)}
            walletAddress={shortCutWallet(user.wallet)}
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
                <ValuesInfo totalSalesToEth={totalSalesToEth} />
              </Box>
            </Box>
          )}

          <Box className={classes.grid} mt={2}>
            {fetching ? (
              <CircularProgressLoader />
            ) : (
              <>
                {filter === FILTER_VALUES.CREATED && <CardUploadNew onClick={() => history.push(routes.createNFT)} />}
                {sortedAssets
                  ? sortedAssets.map((userAsset, i) => (
                      <CardAsset
                        key={i}
                        asset={userAsset}
                        userWallet={user?.wallet}
                        withLabel
                        withAction={Boolean(userAsset.status === STATUSES.LISTED)}
                        button={{
                          onListed: () => handleListed(userAsset),
                          onSell: () => handleListed(userAsset),
                        }}
                        menu={{
                          onUnlisted: () => handleUnlisted(String(userAsset.id)),
                        }}
                      />
                    ))
                  : null}
                {!userAssets?.length && <Empty />}
              </>
            )}
          </Box>
        </Box>
      </ProfileLayout>
    </PageWrapper>
  )
}
