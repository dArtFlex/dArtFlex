import React from 'react'
import { Box } from '@material-ui/core'
import { useStyles } from '../styles'
import moment from 'moment'
import { CardHistory } from '../../../common'

export default function History() {
  const classes = useStyles()

  const data = [
    {
      id: 1,
      avatar:
        'https://st3.depositphotos.com/9880800/15664/i/600/depositphotos_156647500-stock-photo-handsome-man-drinking-coffee-at.jpg',
      date: 1625501403000,
      expiration: 1625933403000,
      user: '@tianadias',
      status: 'pending',
      bidAmountToToken: '0.044',
      bidAmountUsd: '120',
      action: () => console.log('Cancel bid'),
    },
    {
      id: 2,
      avatar: 'https://images.pexels.com/photos/428321/pexels-photo-428321.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      date: 1625501403000,
      expiration: 1625893803000,
      user: '@john.k',
      status: 'pending',
      bidAmountToToken: '0.044',
      bidAmountUsd: '120',
      action: () => console.log('Cancel bid'),
    },
    {
      id: 3,
      avatar:
        'https://us.123rf.com/450wm/mimagephotography/mimagephotography1602/mimagephotography160200833/53356511-close-up-portrait-of-a-smiling-young-african-american-man-in-a-denim-shirt-against-white-background.jpg?ver=6',
      date: 1625501403000,
      expiration: 1625890203000,
      user: '@giannapress',
      status: 'listed',
    },
    {
      id: 4,
      avatar:
        'https://img.freepik.com/free-photo/portrait-of-confident-beautiful-brunette-woman-turning-face-at-camera-with-dreamy-look-white_1258-19144.jpg?size=626&ext=jpg',
      date: 1625501403000,
      user: '@giannapress',
      expiration: 1625883003000,
      status: 'minted',
    },
  ]

  const getCardTitle = (dateStr: number) =>
    `${moment(dateStr).utc(false).format('DD MMMM YYYY')} at ${moment(dateStr).utc(false).format('hh:mm')}`

  return (
    <>
      {data.map(({ avatar, date, expiration, status, user, action }, index) => {
        return (
          <Box className={classes.historyCardWrapper} key={index}>
            <CardHistory
              title={getCardTitle(date)}
              src={`${avatar}`}
              // @ts-ignore
              status={status}
              expDate={`${moment(expiration).utc(false).toNow()}`}
              user={user}
              action={action}
            />
          </Box>
        )
      })}
    </>
  )
}
