import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import routes from 'routes'
import { Box } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { CircularProgressLoader, PageWrapper, CardAsset, CardUploadNew } from 'common'
import { InstagramOutlinedIcon, TwitterIcon, YouTubeIcon } from 'common/icons'
import { selectUser } from 'stores/selectors'
import ProfileLayout from 'layouts/ProfileLayout'
import { Aside, ValuesInfo, Empty } from './components'
import { getUserAssetsRequest } from 'stores/reducers/user'
import { setZazyMintingData } from 'stores/reducers/minting'
import appConst from 'config/consts'
import { useStyles } from './styles'
import { shortCutWallet } from 'utils'
import { useSortedAssets } from './lib'
import { IUserAssets } from './types'

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

export default function Dashboard() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [filter, setFilter] = useState(FILTER_VALUES.IN_WALLET)
  const { user, userAssets, fetching } = useSelector(selectUser())

  const sortedAssets = useSortedAssets({ userAssets, filter })

  if (!user) {
    history.push(routes.home)
    return null
  }

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
      link: user.youtube.length ? `youtube.com/user/${user.youtube}` : undefined,
      icon: <YouTubeIcon className={classes.linkIcon} />,
      href: `https://youtube.com/user/${user.youtube}`,
    },
  ]

  const handleListed = (userAsset: IUserAssets) => {
    dispatch(
      setZazyMintingData({
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
      })
    )
    history.push(routes.sellNFT)
  }

  return (
    <PageWrapper className={classes.wrapper}>
      <ProfileLayout
        coverURL={user.profile_image}
        aside={
          <Aside
            avatar={user.profile_image}
            name={user.fullname}
            userName={user.userid}
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
                <ToggleButton key={value} value={value} selected={filter === value}>
                  {label}
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>

          {filter === FILTER_VALUES.SOLD && (
            <Box className={classes.container}>
              <Box className={classes.inlineFlex}>
                <ValuesInfo />
              </Box>
            </Box>
          )}

          <Box className={classes.grid} mt={2}>
            {fetching ? (
              <CircularProgressLoader />
            ) : (
              <>
                {filter === FILTER_VALUES.CREATED && <CardUploadNew onClick={() => history.push(routes.createNFT)} />}
                {sortedAssets.map((userAsset, i) => (
                  <CardAsset
                    key={i}
                    asset={userAsset}
                    withLabel
                    withAction={Boolean(
                      userAsset.status === appConst.TYPES.INSTANT_BY || userAsset.status === appConst.TYPES.AUCTION
                    )}
                    button={{
                      onListed: () => handleListed(userAsset),
                    }}
                  />
                ))}
                {!userAssets?.length && <Empty />}
              </>
            )}
          </Box>
        </Box>
      </ProfileLayout>
    </PageWrapper>
  )
}
