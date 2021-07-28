import React, { useState } from 'react'
import { Box, IconButton, Paper, TextField, Typography, useMediaQuery } from '@material-ui/core'
import { CheckedIcon, CloseIcon, DragIcon, EditIcon, TrashIcon } from '../../../common/icons'
import { useStyles } from '../styles'
import { INFTCard } from '../types'
import clsx from 'clsx'

export default function NFTCard(props: INFTCard) {
  const classes = useStyles()

  const [isEdit, setIsEdit] = useState(false)

  const isMobile = useMediaQuery('(max-width: 680px)')

  return (
    <Box mt={4}>
      <Box display="flex" alignItems="center">
        {!isMobile && (
          <IconButton className={classes.dragIcon}>
            <DragIcon />
          </IconButton>
        )}

        <Box className={classes.NFTCard}>
          <Paper classes={{ root: classes.NFTWrapper }} elevation={1}>
            <Box className={clsx(classes.flexBoxInit, isMobile && isEdit && classes.mobileEditableNFT)}>
              <div style={{ backgroundImage: `url(${props.url})` }} className={classes.NFTPhoto} />
              {isEdit ? (
                <>
                  <Typography className={classes.NFTLink}>Link</Typography>
                  <TextField
                    type="input"
                    name="link"
                    variant="outlined"
                    className={classes.formField}
                    value={props.url}
                    onChange={() => console.log('Changed')}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.borderedInput,
                      },
                    }}
                  />
                  <Box className={clsx(classes.flexBoxInit, classes.actionButtonsContainer)}>
                    <IconButton className={classes.CheckedIcon} onClick={() => setIsEdit(false)}>
                      <CheckedIcon />
                    </IconButton>
                    <IconButton className={classes.CloseIcon} onClick={() => setIsEdit(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <Typography className={classes.NFTName}>{props.name}</Typography>
                  <IconButton className={classes.EditIcon} onClick={() => setIsEdit(true)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton className={classes.DeleteIcon}>
                    <TrashIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
