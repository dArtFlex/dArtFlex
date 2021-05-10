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
import appConst from 'config/consts'
import { ILinks } from './types'
import { useStyles } from './styles'

const {
  SORT_VALUES: { ENDING_SOON, RECENT, PRICE_LOW_HIGH, PRICE_HIGH_LOW },
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD, FEATURED_ARTWORKS },
} = appConst

const filterItems = [
  {
    label: 'Live Auction',
    value: LIVE_AUCTION,
  },
  {
    label: 'Buy Now',
    value: BUY_NOW,
  },
  {
    label: 'Reserve not met',
    value: RESERVE_NOT_MET,
  },
  {
    label: 'Sold',
    value: SOLD,
  },
  {
    label: 'Featured artworks',
    value: FEATURED_ARTWORKS,
  },
]

export default function Dashboard() {
  const classes = useStyles()

  const links: ILinks[] = [
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
          <Card className={classes.card}>
            <Badge
              classes={{ badge: classes.badge, root: classes.badgeRoot }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={<VerificationIcon />}
            >
              <Avatar src={'https://picsum.photos/200/300'} className={classes.avatar} />
            </Badge>
            <Typography className={classes.name}>Tiana Dias</Typography>
            <Typography className={classes.userName}>@tianadias</Typography>
            <Box className={classes.wallet}>
              <Typography className={classes.text}>0x683a67...11d1e1334</Typography>
              <Button color={'primary'}>Copy</Button>
            </Box>
            <Box pb={11}>
              <Typography variant={'body1'} color={'textSecondary'}>
                Tiana is the Co-founder and Creative Director at Toast. She is a 3D artist that specializes in creating
                content.
              </Typography>
            </Box>
            {links.map(({ link, icon, href }) => (
              <Box key={link} className={classes.linkBox}>
                {icon}
                <Link
                  className={classes.link}
                  href={href}
                  onClick={() => console.log('instagram.com/tianadias')}
                  underline="none"
                >
                  {link}
                </Link>
              </Box>
            ))}
            <Box className={classes.shareBtnCotainer}>
              <IconButton className={classes.borderdIconButton}>
                <ShareIcon />
              </IconButton>
              <IconButton className={classes.borderdIconButton}>
                <ExternalLinkIcon />
              </IconButton>
            </Box>
            <Typography variant={'body1'} color={'textSecondary'} align={'center'}>
              Joined April, 2021
            </Typography>
          </Card>
        }
      >
        <Box>
          <Typography variant={'h1'}>Artworks</Typography>
        </Box>
      </ProfileLayout>
    </PageWrapper>
  )
}
