import React from 'react'
import { Box, Button, CardMedia, IconButton, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import moment from 'moment'
import { IHistoryData } from '../types'
import { ExternalLinkIcon } from '../../../common/icons'

export default function History() {
  const classes = useStyles()

  const data = [
    {
      id: 1,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
      date: 1625501403000,
      bid: 0.44,
      expiration: 1625933403000,
      author: 'tianadias',
    },
    {
      id: 2,
      avatar: 'https://images.pexels.com/photos/428321/pexels-photo-428321.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      date: 1625501403000,
      bid: 0.44,
      expiration: 1625893803000,
      author: 'john.k',
    },
    {
      id: 3,
      avatar:
        'https://us.123rf.com/450wm/mimagephotography/mimagephotography1602/mimagephotography160200833/53356511-close-up-portrait-of-a-smiling-young-african-american-man-in-a-denim-shirt-against-white-background.jpg?ver=6',
      date: 1625501403000,
      bid: 0,
      listed: true,
      expiration: 1625890203000,
      author: 'giannapress',
    },
    {
      id: 4,
      avatar:
        'https://img.freepik.com/free-photo/portrait-of-confident-beautiful-brunette-woman-turning-face-at-camera-with-dreamy-look-white_1258-19144.jpg?size=626&ext=jpg',
      date: 1625501403000,
      bid: 0,
      minted: true,
      author: 'giannapress',
      expiration: 1625883003000,
    },
  ]

  const getHistoryAction = (item: IHistoryData) => {
    if (item.bid) {
      return (
        <Typography>
          Bid <span className={classes.textBold}>{item.bid} ETH</span> ($107.10) has placed
        </Typography>
      )
    } else if (item.listed) {
      return <Typography>Artwork listed</Typography>
    } else if (item.minted) {
      return <Typography>Artwork minted</Typography>
    }
  }

  return (
    <>
      {data.map((item, index) => {
        return (
          <Box className={classes.historyCardWrapper} key={index}>
            <Box className={classes.flexBox}>
              <CardMedia className={classes.userHistoryAvatar} image={`${item.avatar}`} />
              <Box>
                <Typography className={classes.textSecondary}>
                  {moment(item.date).utc(false).format('DD MMMM YYYY')} at{' '}
                  {moment(item.date).utc(false).format('hh:mm')}
                </Typography>
                <Box mt={2}>{getHistoryAction(item)}</Box>
                <Box mt={2}>
                  by <span className={classes.textViolet}>@{item.author}</span>
                </Box>
              </Box>
              <IconButton className={classes.externalIcon}>
                <ExternalLinkIcon />
              </IconButton>
            </Box>
            {item.bid > 0 && (
              <Box className={classes.expirationInfo}>
                <Typography className={classes.textSecondary}>
                  Exp. Date: {moment(item.date).utc(false).toNow()}
                </Typography>
                <Button className={classes.textError}>Cancel bid</Button>
              </Box>
            )}
          </Box>
        )
      })}
    </>
  )
}
