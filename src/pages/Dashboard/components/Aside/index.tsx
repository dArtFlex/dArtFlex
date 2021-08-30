import React, { useState } from 'react'
import { Box, Typography, Card, Avatar, Badge, Button, Link } from '@material-ui/core'
import { PopoverLinks } from 'common'
import { VerificationIcon, TwitterIcon, LinkIcon } from 'common/icons'
import { IAsideProps, ILink } from './types'
import { useStyles } from './styles'
import image from 'common/icons/cover_photo.png'

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
          <Avatar src={avatar === 'blank' ? image : avatar} className={classes.avatar} />
        </Badge>
        <Typography className={classes.name}>{name}</Typography>
        <Typography className={classes.userName}>@{userName}</Typography>
        <Box className={classes.wallet}>
          <Typography className={classes.text}>{walletAddress}</Typography>
          <Button className={classes.actionText}>Copy</Button>
        </Box>
        <Box pb={11} textAlign="center">
          <Typography variant={'body1'} color={'textSecondary'} className={classes.biography}>
            {content}
          </Typography>
        </Box>
        {links
          ? links.map(({ link, icon, href }: ILink) => (
              <Box key={link} className={classes.linkBox}>
                <Box>{icon}</Box>
                <Link className={classes.link} href={href} underline="none" target="_blank">
                  {link}
                </Link>
              </Box>
            ))
          : null}
        <Box className={classes.shareBtnCotainer}>
          {/*Todo will be implemented in next version*/}
          {/*<IconButton*/}
          {/*  className={classes.borderdIconButton}*/}
          {/*  onClick={(event: React.SyntheticEvent<EventTarget>) => {*/}
          {/*    const target = event.currentTarget as HTMLElement*/}
          {/*    setAnchor(target)*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <ShareIcon />*/}
          {/*</IconButton>*/}
          {/*<IconButton className={classes.borderdIconButton}>*/}
          {/*  <ExternalLinkIcon />*/}
          {/*</IconButton>*/}
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
