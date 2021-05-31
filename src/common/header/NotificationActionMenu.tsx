import React from 'react'
import moment from 'moment'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { Box, Typography, Badge } from '@material-ui/core'
import { Popover, Image } from 'common'
import { useStyles } from './styles'

interface INotificationActionMenu {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
}

type IMessageType =
  | 'Artwork was sold'
  | 'Your Item has been bid'
  | 'The price was changed'
  | 'Your auction was ended'
  | 'Your bid  was outbid'
  | 'Please be informed about significant updates to your item'

const MESSAGE_STATUS = {
  READ: 'mark as read',
  UNREAD: 'mark as unread',
}

interface INotificationCard {
  tokenId: string
  image: string
  data: Date
  message: IMessageType
  status: typeof MESSAGE_STATUS.READ | typeof MESSAGE_STATUS.UNREAD
}

const NOTIFICATIONS: INotificationCard[] = [
  {
    tokenId: uuidv4(),
    image: 'https://picsum.photos/500/500',
    data: new Date(),
    message: 'Artwork was sold',
    status: MESSAGE_STATUS.UNREAD,
  },
  {
    tokenId: uuidv4(),
    image: 'https://picsum.photos/500/500',
    data: new Date(),
    message: 'Your Item has been bid',
    status: MESSAGE_STATUS.UNREAD,
  },
  {
    tokenId: uuidv4(),
    image: 'https://picsum.photos/500/500',
    data: new Date(),
    message: 'The price was changed',
    status: MESSAGE_STATUS.READ,
  },
  {
    tokenId: uuidv4(),
    image: 'https://picsum.photos/500/500',
    data: new Date(),
    message: 'Your bid  was outbid',
    status: MESSAGE_STATUS.READ,
  },
  {
    tokenId: uuidv4(),
    image: 'https://picsum.photos/500/500',
    data: new Date(),
    message: 'Please be informed about significant updates to your item',
    status: MESSAGE_STATUS.READ,
  },
]

export default function NotificationActionMenu(props: INotificationActionMenu) {
  const classes = useStyles()
  const { anchor, setAnchor } = props

  return (
    <Popover anchorEl={anchor} onClose={() => setAnchor(null)}>
      <Box className={classes.notificationContainer}>
        <Box pb={2}>
          <Typography variant={'h4'} color={'textPrimary'}>
            Notifications
          </Typography>
        </Box>
        {NOTIFICATIONS.map((n) => (
          <NotificationCard key={n.tokenId} {...n} />
        ))}
      </Box>
    </Popover>
  )
}

function NotificationCard(props: INotificationCard) {
  const classes = useStyles()
  const { status, image, message, data } = props
  return (
    <Badge
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      variant="dot"
      classes={{
        root: clsx(classes.notificationCard, status === 'mark as unread' && classes.notificationBadgeUnread),
        badge: clsx(status === 'mark as unread' && classes.notificationCardBadge),
      }}
      component="div"
    >
      <Box className={classes.notificationCardBox}>
        <Image src={image} className={classes.notificationImage} />
        <Box className={classes.notificationContent}>
          <Typography variant={'body1'} color={'textSecondary'}>{`${moment(data).format('DD MMM YYYY')} at ${moment(
            data
          ).format('hh:mm')}`}</Typography>
          <Typography variant={'body1'} color={'textPrimary'}>
            {message}
          </Typography>
        </Box>
      </Box>
    </Badge>
  )
}
