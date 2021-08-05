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
import { normalizeDate } from 'utils'
import ImageViewer from '../../ImageViewer'

export default function CardAsset(props: ICardAssetProps) {
  const { asset, userWallet, withLabel, withAction, useCardStatus, button } = props // eslint-disable-line @typescript-eslint/no-empty-function
  const classes = useStyles()
  const history = useHistory()

  const { timer } = useTimer(normalizeDate(asset.end_time).getTime() || 0)
  const burnTime = normalizeDate(asset.start_time).getTime() + 1000 * 60 * 60

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  return (
    <>
      <Card
        onClick={() => history.push(`${routes.artworks}/${asset.item_id}`)}
        key={asset.item_id}
        elevation={1}
        className={classes.root}
      >
        <Box className={classes.artContainer}>
          <img src={asset.imageData.image} className={classes.cardImage} />
          {withLabel && <CardBadge status={asset.status} sold={asset.sold} />}
        </Box>
        <Box className={classes.artInfoContainer}>
          <Box display={'flex'} justifyContent={'space-between'}>
            {Boolean(asset.userData) && (
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
          status={asset.status}
          useCardStatus={useCardStatus}
          type={asset.type}
          startPrice={asset.start_price}
          endPrice={asset.end_price}
          currentPrice={asset.current_price}
          sold={asset.sold}
          endTime={asset.end_time}
          burnTime={burnTime}
          timer={timer}
          button={button}
          userWallet={userWallet}
          ownerWallet={asset.userData?.wallet}
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
      {isZoomOpen && (
        <ImageViewer open={isZoomOpen} onClose={() => setIsZoomOpen(false)} images={[asset.imageData.image]} />
      )}
    </>
  )
}
