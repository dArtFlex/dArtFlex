import React from 'react'
import { TimeIcon, BurnIcon } from 'common/icons'
import { Box, Typography, ButtonBase, Card, Avatar } from '@material-ui/core'
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import appConst from 'config/consts'
import clsx from 'clsx'
import routes from 'routes'
import { useTimer } from 'hooks'
import { ICardAssetProps } from './types'

// should be remove from common component
// as it must be pure as much as possible
const {
  FILTER_VALUES: { LIVE_AUCTION, BUY_NOW, RESERVE_NOT_MET, SOLD },
} = appConst

export default function CardAsset(props: ICardAssetProps) {
  const { asset } = props
  const classes = useStyles()
  const history = useHistory()

  const { timer } = useTimer(asset?._expPeriod || 0)

  return (
    <Card key={asset.tokenId} elevation={1}>
      <Box className={classes.artContainer} onClick={() => history.push(`${routes.artworks}/${asset.tokenId}`)}>
        <img src={asset.image} />
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
      <Box className={clsx(classes.cardAction, asset._status === SOLD && classes.cardActionSold)}>
        <Box>
          {asset._status === LIVE_AUCTION && <span>{asset._currentBit ? 'Current Bid' : 'Reserve Price'}</span>}
          {asset._status === BUY_NOW && <span>Buy Now</span>}
          {asset._status === RESERVE_NOT_MET && <span>Reserve Price</span>}
          {asset._status === SOLD && <span>Sold for</span>}
          <Typography color={'inherit'} variant={'h3'}>
            {asset._status === LIVE_AUCTION && `${asset._priceReserve || asset._currentBit} ETH`}
            {asset._status === BUY_NOW && `${asset._price} ETH`}
            {asset._status === RESERVE_NOT_MET ? (asset._priceReserve ? `${asset._priceReserve} ETH` : '-') : ''}
            {asset._status === SOLD && `${asset._sold} ETH`}
          </Typography>
        </Box>
        {asset._status === LIVE_AUCTION && (
          <ButtonBase
            className={clsx(classes.actionBtn, asset._expPeriod < new Date().getTime() && classes.actionBtnBurn)}
          >
            {asset._expPeriod < new Date().getTime() ? (
              <BurnIcon className={classes.actionBtnIcon} />
            ) : (
              <TimeIcon className={classes.actionBtnIcon} />
            )}
            {timer}
          </ButtonBase>
        )}
      </Box>
    </Card>
  )
}
