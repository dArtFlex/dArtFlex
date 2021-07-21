import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IPromotionAsset } from 'stores/reducers/user/types'
import { selectPromotion } from 'stores/selectors'
import { Box, Button, Icon, List, ListItem, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import { PlusSmallIcon } from '../../../common/icons'
import NFTCard from './NFTCard'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

export default function PromotionManagement() {
  const classes = useStyles()

  const { promotionAssets, promotionIds } = useSelector(selectPromotion())
  const [artworks, setArtworks] = useState(promotionAssets)

  function handleOnDragEnd(res: DropResult) {
    if (!res.destination) return
    const items = Array.from(artworks)
    const [reorderedItem] = items.splice(res.source.index, 1)
    items.splice(res.destination.index, 0, reorderedItem)
    setArtworks(items)
  }

  return (
    <Box className={classes.managementWrapper}>
      <Box display="flex" alignItems="center" ml={7}>
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
                {artworks.map((item: IPromotionAsset, index: number) => {
                  return (
                    <Draggable key={item.tokenData.id} draggableId={item.tokenData.toString()} index={index}>
                      {(provided) => {
                        return (
                          <ListItem
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            classes={{ root: classes.listItem }}
                          >
                            <NFTCard url={item.imageData.image} name={item.imageData.name} />
                          </ListItem>
                        )
                      }}
                    </Draggable>
                  )
                })}
              </List>
            )
          }}
        </Droppable>
      </DragDropContext>
      <Box mt={6} ml={6}>
        <Box display="flex">
          <Button classes={{ label: classes.addButton }}>
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
