import React, { useState } from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { Box, Typography, Card, Avatar, Badge, Button, Link, IconButton } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { CircularProgressLoader, PageWrapper, StyledCheckedMenuItem, CardAsset } from 'common'
import {
  VerificationIcon,
  InstagramOutlinedIcon,
  TwitterIcon,
  YouTubeIcon,
  ShareIcon,
  ExternalLinkIcon,
} from 'common/icons'
import { selectAssets, selectWallet } from 'stores/selectors'
import ProfileLayout from 'layouts/ProfileLayout'
import { Aside } from './components'
import appConst from 'config/consts'
import { useStyles } from './styles'

const {
  FILTER_VALUES: { IN_AUCTION, CREATED, COLLECTED, SOLD },
} = appConst

const filterItems = [
  {
    label: 'In Wallet',
    value: IN_AUCTION,
  },
  {
    label: 'Created',
    value: CREATED,
  },
  {
    label: 'Collected',
    value: COLLECTED,
  },
  {
    label: 'Sold',
    value: SOLD,
  },
]

export default function Dashboard() {
  const classes = useStyles()
  const [filter, setFilter] = useState(IN_AUCTION)
  const { assets, fetching } = useSelector(selectAssets())

  const links = [
    {
      link: 'instagram.com/tianadias',
      icon: <InstagramOutlinedIcon className={classes.linkIcon} />,
      href: '#',
    },
    {
      link: 'twitter.com/tianadias',
      icon: <TwitterIcon className={classes.linkIcon} />,
      href: '#',
    },
    {
      link: 'youtube.com/user/tianadias',
      icon: <YouTubeIcon className={classes.linkIcon} />,
      href: '#',
    },
  ]

  return (
    <PageWrapper className={classes.wrapper}>
      <ProfileLayout
        coverURL={'https://picsum.photos/1500/500'}
        aside={
          <Aside
            avatar={'https://picsum.photos/200/300'}
            name={'Tiana Dias'}
            userName={'tianadias'}
            walletAddress={'0x683a67...11d1e1334'}
            content={
              'Tiana is the Co-founder and Creative Director at Toast. She is a 3D artist that specializes in creating content.'
            }
            links={links}
            joinedToArtworks={'Joined April, 2021'}
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
          <Box className={classes.grid} mt={2}>
            {fetching ? (
              <CircularProgressLoader />
            ) : (
              assets
                ?.filter((el) => {
                  if (filter === IN_AUCTION) {
                    return true
                  }
                  return el._status === filter
                })
                .map((asset, i) => <CardAsset key={i} asset={asset} withLabel />)
            )}
          </Box>
        </Box>
      </ProfileLayout>
    </PageWrapper>
  )
}
