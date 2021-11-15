import React, { useState } from 'react'
import { PopoverLinks, UserBox } from 'common'
import { MoreHorizontalIcon } from 'common/icons'
import { Box, Typography, IconButton, Card } from '@material-ui/core'
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import routes from 'routes'
import { useTimer } from 'hooks'
import CardActions from './CardActions'
import CardBadge from './CardBadge'
import { ICardAssetProps } from './types'
import { normalizeDate } from 'utils'
import { useSelector } from 'react-redux'
import { selectWallet } from '../../../stores/selectors'
import BigNumber from 'bignumber.js'

export default function CardAsset(props: ICardAssetProps) {
  const { asset, withLabel, withAction, useCardStatus, button, emptyBottom, menu, viewOnly = false } = props

  const classes = useStyles()
  const history = useHistory()

  const { timer } = useTimer(normalizeDate(asset.end_time).getTime() || 0)
  const { wallet } = useSelector(selectWallet())
  const burnTime = normalizeDate(`${new Date()}`).getTime() + 1000 * 60 * 60

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  function cardActionEvent() {
    if (history.location.pathname.search('profile')) {
      return asset.id
        ? history.push(`${routes.artworks}/${asset.item_id}`)
        : history.push(`${routes.artworks}/${asset.tokenData?.id}`)
    }

    switch (history.location.pathname) {
      case routes.artworks:
        history.push(`${routes.artworks}/${asset.item_id}`)
        break
      case routes.dashboard:
      case routes.sales:
        asset.id
          ? history.push(`${routes.artworks}/${asset.item_id}`)
          : history.push(`${routes.artworks}/${asset.tokenData?.id}`)
    }
  }

  const convertPrice = (price: string) =>
    new BigNumber(price)
      .dividedBy(`10e${18 - 1}`)
      .toNumber()
      .toFixed(4)

  return (
    <>
      <Card key={asset.item_id} elevation={1} className={classes.root} onClick={cardActionEvent}>
        <Box className={classes.artContainer}>
          {asset.imageData?.image && <img src={asset.imageData.image} className={classes.cardImage} alt="card_image" />}
          {withLabel && <CardBadge status={asset.status} sold={asset.sold} />}
        </Box>
        <Box className={classes.artInfoContainer}>
          <Box display={'flex'} justifyContent={'space-between'}>
            {Boolean(asset.userData) && (
              <UserBox
                userImage={asset.userData.profile_image}
                wallet={asset.userData.wallet}
                userId={asset.userData.userid ? asset.userData.userid : 'you'}
              />
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
          <Typography variant={'h4'}>{asset.imageData?.name}</Typography>
          {asset.highest_bid?.length ? (
            <Typography className={classes.highestBidInfo}>
              Highest bid {convertPrice(asset.highest_bid[0].bid_amount)} WETH
            </Typography>
          ) : null}
          {asset.highest_offer?.length ? (
            <Typography className={classes.highestBidInfo}>
              Highest offer {convertPrice(asset.highest_offer[0].bid_amount)} ETH
            </Typography>
          ) : null}
        </Box>
        <CardActions
          status={asset.status}
          useCardStatus={useCardStatus}
          type={asset.type}
          startPrice={asset.start_price}
          endPrice={asset.end_price}
          currentPrice={
            asset.current_price || (asset.marketplace?.length ? asset.marketplace[0].bid_amount : undefined)
          }
          sold={asset.sold}
          endTime={asset.end_time}
          burnTime={burnTime}
          timer={timer}
          button={button}
          userWallet={wallet?.accounts[0]}
          ownerWallet={asset.userData.wallet}
          emptyBottom={emptyBottom}
          sales_token_contract={asset.sales_token_contract}
          tokenSymbol={asset.tokenSymbol}
          viewOnly={viewOnly}
        />
      </Card>

      <PopoverLinks
        anchor={anchor}
        setAnchor={setAnchor}
        links={[
          {
            lable: 'Unlist Artwork',
            onClick: () => {
              menu?.onUnlisted && menu.onUnlisted()
              setAnchor(null)
            },
          },
        ]}
      />
    </>
  )
}
