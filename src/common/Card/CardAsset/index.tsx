import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
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

  const { timer } = useTimer(new Date(asset.end_time).getTime() || 0)
  const burnTime = new Date(asset.start_time).getTime() + 1000 * 60 * 60
  const startPrice = new BigNumber(asset.start_price).dividedBy(`10e${18 - 1}`).toNumber()

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  return (
    <>
      <Card key={asset.item_id} elevation={1}>
        <Box className={classes.artContainer} onClick={() => history.push(`${routes.artworks}/${asset.id}`)}>
          <img src={asset.imageData.image} />
          {withLabel && <CardBadge status={asset.type} />}
        </Box>
        <Box className={classes.artInfoContainer}>
          <Box display={'flex'} justifyContent={'space-between'}>
            {Boolean(asset.userData.length) && (
              <Box display={'flex'} mb={4} alignItems={'center'}>
                <Avatar className={classes.avatar} alt="Avatar" src={asset.userData.profile_image} />
                <Typography variant={'h4'}>{asset.userData.userid ? `@${asset.userData.userid}` : '@you'}</Typography>
              </Box>
            )}

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
          <Typography variant={'h4'}>{asset.imageData.name}</Typography>
        </Box>
        <CardActions
          status={asset.type}
          currentBit={asset.end_price}
          priceReserve={asset.end_price}
          price={startPrice}
          sold={asset.sold}
          expPeriod={asset.end_time}
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
