import React from 'react'
import { TimeIcon, BurnIcon } from 'common/icons'
import { Box, Typography, Icon, Card, Avatar } from '@material-ui/core'
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import appConst from 'config/consts'
import clsx from 'clsx'
import routes from 'routes'
import { useTimer } from 'hooks'
import CardActions from './CardActions'
import CardBadge from './CardBadge'
import { ICardAssetProps } from './types'

export default function CardAsset(props: ICardAssetProps) {
  const { asset, withLabel } = props
  const classes = useStyles()
  const history = useHistory()

  const { timer } = useTimer(asset?._expPeriod || 0)
  const burnTime = new Date().getTime() + 1000 * 60 * 60

  return (
    <Card key={asset.tokenId} elevation={1}>
      <Box className={classes.artContainer} onClick={() => history.push(`${routes.artworks}/${asset.tokenId}`)}>
        <img src={asset.image} />
        {withLabel && <CardBadge status={asset._status} />}
      </Box>
      <Box className={classes.artInfoContainer}>
        <Box display={'flex'} mb={4} alignItems={'center'}>
          <Avatar className={classes.avatar} alt="Avatar" />
          <Typography variant={'h4'}>
            {asset?.owner?.user?.username ? `@${asset.owner.user.username}` : '@you'}
          </Typography>
        </Box>
        <Typography variant={'h4'}>{asset.name}</Typography>
      </Box>
      <CardActions
        status={asset._status}
        currentBit={asset._currentBit}
        priceReserve={asset._priceReserve}
        price={asset._price}
        sold={asset._sold}
        expPeriod={asset._expPeriod}
        burnTime={burnTime}
        timer={timer}
      />
    </Card>
  )
}
