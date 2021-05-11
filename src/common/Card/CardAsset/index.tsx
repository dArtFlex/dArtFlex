import React, { useState } from 'react'
import { PopoverLinks } from 'common'
import { MoreHorizontalIcon } from 'common/icons'
import { Box, Typography, IconButton, Card, Avatar } from '@material-ui/core'
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import routes from 'routes'
import { useTimer } from 'hooks'
import CardActions from './CardActions'
import CardBadge from './CardBadge'
import { ICardAssetProps } from './types'

export default function CardAsset(props: ICardAssetProps) {
  const { asset, withLabel, withAction } = props
  const classes = useStyles()
  const history = useHistory()

  const { timer } = useTimer(asset?._expPeriod || 0)
  const burnTime = new Date().getTime() + 1000 * 60 * 60

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  return (
    <>
      <Card key={asset.tokenId} elevation={1}>
        <Box className={classes.artContainer} onClick={() => history.push(`${routes.artworks}/${asset.tokenId}`)}>
          <img src={asset.image} />
          {withLabel && <CardBadge status={asset._status} />}
        </Box>
        <Box className={classes.artInfoContainer}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} mb={4} alignItems={'center'}>
              <Avatar className={classes.avatar} alt="Avatar" />
              <Typography variant={'h4'}>
                {asset?.owner?.user?.username ? `@${asset.owner.user.username}` : '@you'}
              </Typography>
            </Box>
            {withAction && (
              <IconButton
                className={classes.borderdIconButton}
                onClick={(event: React.SyntheticEvent<EventTarget>) => {
                  const target = event.currentTarget as HTMLElement
                  setAnchor(target)
                }}
              >
                <MoreHorizontalIcon />
              </IconButton>
            )}
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

      <PopoverLinks
        anchor={anchor}
        setAnchor={setAnchor}
        links={[
          {
            lable: 'Change Price',
            onClick: () => console.log('Change Price'),
          },
          {
            lable: 'Unlist Artwork',
            onClick: () => console.log('Unlist Artwork'),
          },
        ]}
      />
    </>
  )
}
