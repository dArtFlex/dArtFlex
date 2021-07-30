import React from 'react'
import { useSelector } from 'react-redux'
import { selectNotifications } from 'stores/selectors'
import moment from 'moment'
import clsx from 'clsx'
import { Box, Typography, Badge } from '@material-ui/core'
import { Popover, Image } from 'common'
import { useStyles } from './styles'
import { INotifications } from 'types'

interface INotificationActionMenu {
  anchor: null | HTMLElement
  setAnchor: (target: null) => void
}

export default function NotificationActionMenu(props: INotificationActionMenu) {
  const classes = useStyles()
  const { anchor, setAnchor } = props
  const { notifications } = useSelector(selectNotifications())

  return (
    <Popover anchorEl={anchor} onClose={() => setAnchor(null)}>
      <Box className={classes.notificationContainer}>
        <Box pb={2}>
          <Typography variant={'h4'} color={'textPrimary'}>
            Notifications
          </Typography>
        </Box>
        {notifications.map((n) => (
          <NotificationCard key={n.item_id} {...n} />
        ))}
      </Box>
    </Popover>
  )
}

function NotificationCard(props: INotifications) {
  const classes = useStyles()
  const { status, image, message, updated_at } = props

  return (
    <Badge
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      variant="dot"
      classes={{
        root: clsx(classes.notificationCard, !status && classes.notificationBadgeUnread),
        badge: clsx(!status && classes.notificationCardBadge),
      }}
      component="div"
    >
      <Box className={classes.notificationCardBox}>
        <Image src={image} className={classes.notificationImage} />
        <Box className={classes.notificationContent}>
          <Typography variant={'body1'} color={'textSecondary'}>{`${moment(updated_at).format(
            'DD MMM YYYY'
          )} at ${moment(updated_at).format('hh:mm')}`}</Typography>
          <Typography variant={'body1'} color={'textPrimary'}>
            {message}
          </Typography>
        </Box>
      </Box>
    </Badge>
  )
}
