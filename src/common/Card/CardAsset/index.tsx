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

export default function CardAsset(props: ICardAssetProps) {
  const { asset, userWallet, withLabel, withAction, useCardStatus, button, emptyBottom, menu } = props

  const classes = useStyles()
  const history = useHistory()

  const { timer } = useTimer(normalizeDate(asset.end_time).getTime() || 0)
  const burnTime = normalizeDate(`${new Date()}`).getTime() + 1000 * 60 * 60

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  function cardActionEvent() {
    switch (history.location.pathname) {
      case routes.artworks:
        history.push(`${routes.artworks}/${asset.item_id}`)
        break
      case routes.dashboard:
        asset.id
          ? history.push(`${routes.artworks}/${asset.item_id}`)
          : history.push(`${routes.artworks}/${asset.tokenData?.id}`)
    }
  }

  return (
    <>
      <Card onClick={cardActionEvent} key={asset.item_id} elevation={1} className={classes.root}>
        <Box className={classes.artContainer}>
          <img src={asset.imageData.image} className={classes.cardImage} alt="card_image" />
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
                  event.stopPropagation()
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
          emptyBottom={emptyBottom}
        />
      </Card>

      <PopoverLinks
        anchor={anchor}
        setAnchor={setAnchor}
        links={[
          {
            lable: 'Unlist Artwork',
            onClick: () => menu?.onUnlisted && menu.onUnlisted(),
          },
        ]}
      />
    </>
  )
}
