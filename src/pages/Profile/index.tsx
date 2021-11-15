import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
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
import { selectUser, selectSearch, selectChain } from 'stores/selectors'
import ProfileLayout from 'layouts/ProfileLayout'
import { Aside, ValuesInfo, Empty } from './components'
import { getUserAssetsMetaRequest, getUserProfileRequest } from 'stores/reducers/user'
import appConst from 'config/consts'
import { useStyles } from './styles'
import { shortCutName, getTokenSymbolByContracts } from 'utils'
import { useSortedAssets } from './lib'
import { useSearchAssets } from 'hooks'
import { IUserSoldAssets } from 'stores/reducers/user/types'
import BigNumber from 'bignumber.js'
import image from 'common/icons/cover_photo.png'

const { FILTER_VALUES } = appConst

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

export default function Profile() {
  const classes = useStyles()
  const history = useHistory()
  const { id }: { id: string } = useParams()
  const dispatch = useDispatch()
  const [filter, setFilter] = useState(FILTER_VALUES.IN_WALLET)
  const { profile, userAssets, userCollectedAssets, userSoldAssets, userCreatedAssets, fetchingAssets } = useSelector(
    selectUser()
  )
  const { chainId } = useSelector(selectChain())

  const { search } = useSelector(selectSearch())
  const searchAssets = useSearchAssets({ assets: userAssets, search })
  const searchCollectedAssets = useSearchAssets({ assets: userCollectedAssets, search })
  const searchSoldAssets = useSearchAssets({ assets: userSoldAssets, search })
  const searchCreatedAssets = useSearchAssets({ assets: userCreatedAssets, search })

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

  if (!id) {
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
    dispatch(getUserAssetsMetaRequest({ chainId, wallet: id, filter }))
    dispatch(getUserProfileRequest({ wallet: id }))
  }, [filter])

  const links = profile
    ? [
        {
          link: profile.instagram.length ? `instagram.com/${profile.instagram}` : undefined,
          icon: <InstagramOutlinedIcon className={classes.linkIcon} />,
          href: `https://instagram.com/${profile.instagram}`,
        },
        {
          link: profile.twitter.length ? `twitter.com/${profile.twitter}` : undefined,
          icon: <TwitterIcon className={classes.linkIcon} />,
          href: `https://twitter.com/${profile.twitter}`,
        },
        {
          link: profile.youtube.length ? `${profile.youtube}` : undefined,
          icon: <YouTubeIcon className={classes.linkIcon} />,
          href: `${profile.youtube}`,
        },
        {
          link: profile.facebook.length ? `${profile.facebook}` : undefined,
          icon: <FacebookIcon className={classes.linkIcon} />,
          href: `https://facebook.com/${profile.facebook}`,
        },
        {
          link: profile.tiktok.length ? `${profile.tiktok}` : undefined,
          icon: <TikTokIcon className={classes.linkIcon} />,
          href: `https://tiktok.com/@${profile.tiktok}`,
        },
        {
          link: profile.discord.length ? `${profile.discord}` : undefined,
          icon: <CodeIcon className={classes.linkIcon} />,
        },
        {
          link: profile.website.length ? `${profile.website}` : undefined,
          icon: <WorldIcon className={classes.linkIcon} />,
          href: `${profile.website}`,
        },
        {
          link: profile.other_url.length ? `${profile.other_url}` : undefined,
          icon: <LinkIcon className={classes.linkIcon} />,
          href: `${profile.other_url}`,
        },
      ]
    : []

  const totalSales = userSoldAssets
    .map((a: IUserSoldAssets) => {
      return a.marketplace ? a.marketplace[0].bid_amount : '0'
    })
    .reduce((acc, price) => new BigNumber(acc).plus(price).toString(), '0')
  const totalSalesToEth = new BigNumber(totalSales).dividedBy(`10e${18 - 1}`).toString()
  const totalRevenueToEth = new BigNumber(totalSalesToEth)
    .minus(new BigNumber(totalSalesToEth).dividedBy(100).multipliedBy(2.5))
    .toString()

  return (
    <>
      <PageWrapper className={classes.wrapper}>
        <ProfileLayout
          coverURL={profile && profile.cover_image !== 'blank' ? profile.cover_image : image}
          aside={
            profile ? (
              <Aside
                avatar={profile.profile_image}
                name={profile.fullname}
                userName={profile ? shortCutName(profile.userid) : ''}
                walletAddress={profile.wallet}
                content={profile.overview}
                links={links.filter((l) => l.link !== undefined)}
                joinedToArtworks={`Joined ${moment(profile.created_at).format('MMMM, YYYY')}`}
              />
            ) : null
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
                  <ValuesInfo totalSalesToEth={totalSalesToEth} totalRevenueToEth={totalRevenueToEth} />
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
                          userWallet={profile?.wallet}
                          withLabel
                          viewOnly
                          button={{
                            onView: () => history.push('/artworks/' + userAsset.tokenData.id),
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
    </>
  )
}
