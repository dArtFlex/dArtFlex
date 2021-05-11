import React, { useState } from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { Box, Typography, Card, Avatar, Badge, Button, Link, IconButton } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { CircularProgressLoader, PageWrapper, StyledCheckedMenuItem, PopoverLinks } from 'common'
import {
  VerificationIcon,
  InstagramOutlinedIcon,
  TwitterIcon,
  YouTubeIcon,
  LinkIcon,
  ShareIcon,
  ExternalLinkIcon,
} from 'common/icons'
import { selectAssets, selectWallet } from 'stores/selectors'
import ProfileLayout from 'layouts/ProfileLayout'
import appConst from 'config/consts'
import { IAsideProps } from './types'
import { useStyles } from './styles'

export default function Aside(props: IAsideProps) {
  const { avatar, name, userName, walletAddress, content, links, joinedToArtworks } = props
  const classes = useStyles()

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  return (
    <>
      <Card className={classes.card}>
        <Badge
          classes={{ badge: classes.badge, root: classes.badgeRoot }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={<VerificationIcon />}
        >
          <Avatar src={avatar} className={classes.avatar} />
        </Badge>
        <Typography className={classes.name}>{name}</Typography>
        <Typography className={classes.userName}>@{userName}</Typography>
        <Box className={classes.wallet}>
          <Typography className={classes.text}>{walletAddress}</Typography>
          <Button color={'primary'}>Copy</Button>
        </Box>
        <Box pb={11}>
          <Typography variant={'body1'} color={'textSecondary'}>
            {content}
          </Typography>
        </Box>
        {links.map(({ link, icon, href }) => (
          <Box key={link} className={classes.linkBox}>
            {icon}
            <Link className={classes.link} href={href} underline="none">
              {link}
            </Link>
          </Box>
        ))}
        <Box className={classes.shareBtnCotainer}>
          <IconButton
            className={classes.borderdIconButton}
            onClick={(event: React.SyntheticEvent<EventTarget>) => {
              const target = event.currentTarget as HTMLElement
              setAnchor(target)
            }}
          >
            <ShareIcon />
          </IconButton>
          <IconButton className={classes.borderdIconButton}>
            <ExternalLinkIcon />
          </IconButton>
        </Box>
        <Typography variant={'body1'} color={'textSecondary'} align={'center'}>
          {joinedToArtworks}
        </Typography>
      </Card>

      <PopoverLinks
        anchor={anchor}
        setAnchor={setAnchor}
        title={<Typography className={classes.linksTitle}>Share with</Typography>}
        links={[
          {
            lable: 'Twitter',
            icon: <TwitterIcon className={classes.icon} />,
            onClick: () => console.log('Twitter'),
          },
          {
            lable: 'Copy link',
            icon: <LinkIcon className={classes.icon} />,
            onClick: () => console.log('Trading History'),
          },
        ]}
      />
    </>
  )
}
