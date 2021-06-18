import React, { useState } from 'react'
import { Box, IconButton, Input, Paper, Typography } from '@material-ui/core'
import { CheckedIcon, CloseIcon, DragIcon, EditIcon, TrashIcon } from '../../../common/icons'
import { useStyles } from '../styles'
import { INFTCard } from '../types'

export default function NFTCard(props: INFTCard) {
  const classes = useStyles()

  const [isEdit, setIsEdit] = useState(false)

  return (
    <Box mt={4}>
      <Box display="flex" alignItems="center">
        <IconButton className={classes.dragIcon}>
          <DragIcon />
        </IconButton>
        <Box ml={5}>
          <Paper classes={{ root: classes.NFTWrapper }} elevation={1}>
            <Box display="flex" alignItems="center">
              <div style={{ backgroundImage: `url(${props.url})` }} className={classes.NFTPhoto} />
              {isEdit ? (
                <>
                  <Typography className={classes.NFTLink}>Link</Typography>
                  <input value={props.url} className={classes.NFTInputBox} />
                  <IconButton className={classes.CheckedIcon} onClick={() => setIsEdit(false)}>
                    <CheckedIcon />
                  </IconButton>
                  <IconButton className={classes.CloseIcon} onClick={() => setIsEdit(false)}>
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography className={classes.NFTName}>{props.name}</Typography>
                  <IconButton className={classes.EditIcon} onClick={() => setIsEdit(true)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton className={classes.DeleteIcon}>
                    <TrashIcon />
                  </IconButton>{' '}
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
