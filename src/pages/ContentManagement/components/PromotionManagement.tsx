import React, { useState } from 'react'
import { Box, Button, Icon, List, ListItem, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import { PlusSmallIcon } from '../../../common/icons'
import NFTCard from './NFTCard'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export default function PromotionManagement() {
  const classes = useStyles()

  const NFTs = [
    {
      id: 1,
      name: 'H74 Golden Panther',
      link: 'https://dartflex.app/h74goldenpartner',
      url: 'https://thedefiant.io/wp-content/uploads/2021/01/Screen-Shot-2021-01-13-at-12.39.11-PM.png',
    },
    {
      id: 2,
      name: 'H74 Golden Panther',
      link: 'https://dartflex.app/h74goldenpartner',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUwL1z_VJT5ROiPYtxh6NVhXNZbDqgGQUQGA&usqp=CAU',
    },
    {
      id: 3,
      name: 'H74 Golden Panther',
      link: 'https://dartflex.app/h74goldenpartner',
      url: 'https://i1.sndcdn.com/avatars-000583389681-ryc31l-t240x240.jpg',
    },
    {
      id: 4,
      name: 'H74 Golden Panther',
      link: 'https://dartflex.app/h74goldenpartner',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH71-pLZowvl0KEETWvj_ceNOjtjbd4DLsVg&usqp=CAU',
    },
  ]

  const [artworks, setArtworks] = useState(NFTs)

  function handleOnDragEnd(res: any) {
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
          {NFTs.length} NFTs&nbsp;
        </Typography>
        <Typography className={classes.textSecondary}>(6 recommended)</Typography>
      </Box>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="NFTCard">
          {(provided) => {
            return (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {artworks.map((item, index) => {
                  return (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided) => {
                        return (
                          <ListItem
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            classes={{ root: classes.listItem }}
                          >
                            <NFTCard url={item.url} name={item.name} />
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
