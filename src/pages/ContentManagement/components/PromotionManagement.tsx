import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IPromotionAsset } from 'stores/reducers/user/types'
import {
  checkAssetIdRequest,
  addPromotionRequest,
  deletePromotionRequest,
  updatePromotionRequest,
} from 'stores/reducers/user'
import { selectPromotion } from 'stores/selectors'
import { Box, Button, Icon, List, ListItem, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import { PlusSmallIcon } from '../../../common/icons'
import NFTCard from './NFTCard'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { INewPromotion } from '../types'

export default function PromotionManagement() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { promotionAssets, promotionIds } = useSelector(selectPromotion())
  const [artworks, setArtworks] = useState<Array<IPromotionAsset | INewPromotion>>(promotionAssets)

  useEffect(() => {
    setArtworks(promotionAssets)
  }, [promotionAssets])

  function handleOnDragEnd(res: DropResult) {
    if (!res.destination) return
    const items = Array.from(artworks)
    const [reorderedItem] = items.splice(res.source.index, 1)
    items.splice(res.destination.index, 0, reorderedItem)
    setArtworks(items)
    handleUpdatePromotion(items)
  }

  const handleAddNft = () => {
    setArtworks([
      ...artworks,
      {
        tokenData: {
          id: 0,
        },
        imageData: {
          image: '',
          name: '',
        },
        marketData: {
          item_id: '',
        },
      },
    ])
  }

  const handleUpdatePromotion = (items: Array<IPromotionAsset | INewPromotion>) => {
    const promotion = items.reduce(
      (acc: Array<IPromotionAsset | INewPromotion>, p) => (p.marketData?.item_id ? [...acc, p] : acc),
      []
    )
    const promotionIds = promotion.map((p) => p.marketData?.item_id)
    dispatch(updatePromotionRequest({ promotionIds }))
  }

  const handleChangePromotion = (value: string, index: number) => {
    const match = value.match(/\d/g)
    const item_id = match ? match?.join('') : ''
    setArtworks(
      artworks.map((p: IPromotionAsset | INewPromotion, i) =>
        i === index ? { ...p, marketData: { ...p.marketData, item_id } } : p
      )
    )

    dispatch(checkAssetIdRequest({ item_id }))
  }

  const handleAddPromotion = (promotionId: string) => {
    dispatch(addPromotionRequest({ promotionId }))
  }

  const handleDeletePromotion = (promotionItemId: string) => {
    const promotionIdIndex: number = promotionIds.findIndex((p) => p.item_id === promotionItemId)
    if (promotionIdIndex !== -1) {
      dispatch(
        deletePromotionRequest({
          promotionItemId,
          promotionId: promotionIds[promotionIdIndex].id,
        })
      )
      setArtworks(
        artworks.reduce(
          (acc: Array<IPromotionAsset | INewPromotion>, id) =>
            id.marketData?.item_id !== promotionItemId ? [...acc, id] : acc,
          []
        )
      )
    } else {
      setArtworks(
        artworks.reduce(
          (acc: Array<IPromotionAsset | INewPromotion>, id) =>
            id.marketData?.item_id !== promotionItemId ? [...acc, id] : acc,
          []
        )
      )
    }
  }

  return (
    <Box className={classes.managementWrapper}>
      <Box className={classes.nftCountInfo}>
        <Typography component="span" variant={'h4'}>
          {promotionIds.length} NFTs&nbsp;
        </Typography>
        <Typography className={classes.textSecondary}>(6 recommended)</Typography>
      </Box>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="NFTCard">
          {(provided) => {
            return (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {artworks.map((item: IPromotionAsset | INewPromotion, index: number) => {
                  return (
                    <Draggable key={item.tokenData.id} draggableId={String(item.tokenData.id)} index={index}>
                      {(provided) => {
                        return (
                          <ListItem
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            classes={{ root: classes.listItem }}
                          >
                            <NFTCard
                              url={item.imageData.image}
                              name={item.imageData.name}
                              item_id={String(item.marketData?.item_id)}
                              onChangePromotion={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangePromotion(e.target.value, index)
                              }}
                              onAddPromotion={() => handleAddPromotion(String(item.marketData?.item_id))}
                              onDeletePromotion={() => handleDeletePromotion(String(item.marketData?.item_id))}
                            />
                          </ListItem>
                        )
                      }}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </List>
            )
          }}
        </Droppable>
      </DragDropContext>

      <Box className={classes.addNFTButton}>
        <Box display="flex">
          <Button classes={{ label: classes.addButton }} onClick={handleAddNft}>
            <Icon classes={{ root: classes.addNFTIcon }}>
              <PlusSmallIcon />
            </Icon>
            <Typography className={classes.addButtonText}>Add NFT</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
