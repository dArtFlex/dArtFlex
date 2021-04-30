import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Box,
  Link,
  Divider,
  Button,
} from '@material-ui/core'
import { ExternalLinkIcon } from 'common/icons'
import { useStyles } from './styles'
import { ICardHistoryProps, ICardContainerProps } from './types'

export default function CardHistory(props: ICardHistoryProps) {
  const { status, title, user, expDate, src, action } = props
  const classes = useStyles()

  switch (status) {
    case 'owend':
    case 'transferred':
    case 'sold':
    case 'minted':
    case 'listed':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={src} />}
          action={
            <IconButton className={classes.borderdIconButton}>
              <ExternalLinkIcon />
            </IconButton>
          }
          title={title}
          subheader={
            <Box>
              <Typography className={classes.subheader}>Artwork {status}</Typography>
              by <Link underline="none">@gianapress</Link>
            </Box>
          }
        />
      )

    case 'logged':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={src} />}
          action={
            <IconButton className={classes.borderdIconButton}>
              <ExternalLinkIcon />
            </IconButton>
          }
          title={title}
          subheader={
            <Box>
              <Typography className={classes.subheader}>
                Bid <strong>0.044 ETH</strong> ($107.10) placed
              </Typography>
              by <Link underline="none">{user}</Link>
            </Box>
          }
        >
          <CardContent classes={{ root: classes.footer }}>
            <Divider />
            <Box className={classes.footerBox}>
              <Typography className={classes.footerText}>Exp. Date: {expDate}</Typography>
              {action && (
                <Button classes={{ root: classes.cardBtn }} disableRipple>
                  Cancel Bid
                </Button>
              )}
            </Box>
          </CardContent>
        </CardContainer>
      )
    case 'canceled':
      return (
        <CardContainer
          avatar={<Avatar aria-label={status} className={classes.avatar} src={src} />}
          action={
            <IconButton className={classes.borderdIconButton}>
              <ExternalLinkIcon />
            </IconButton>
          }
          title={title}
          subheader={
            <Box>
              <Typography className={classes.subheader}>
                <span className={classes.strike}>
                  Bid <strong>0.044 ETH</strong> ($107.10)
                </span>{' '}
                canceled
              </Typography>
              by <Link underline="none">@gianapress</Link>
            </Box>
          }
        />
      )
    default:
      return null
  }
}

const CardContainer = (props: ICardContainerProps) => {
  const { children, ...rest } = props
  const classes = useStyles()

  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        classes={{
          root: classes.header,
          action: classes.action,
          title: classes.title,
          subheader: classes.subheader,
        }}
        {...rest}
      />
      {children}
    </Card>
  )
}
