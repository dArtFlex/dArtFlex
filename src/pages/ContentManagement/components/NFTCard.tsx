import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'stores/selectors'
import { Box, IconButton, Paper, TextField, Typography, useMediaQuery } from '@material-ui/core'
import { CheckedIcon, CloseIcon, DragIcon, EditIcon, TrashIcon } from '../../../common/icons'
import { useStyles } from '../styles'
import { INFTCard } from '../types'
import clsx from 'clsx'

export default function NFTCard(props: INFTCard) {
  const { url, item_id, name, onChangePromotion, onAddPromotion, onDeletePromotion } = props
  const classes = useStyles()
  const [isEdit, setIsEdit] = useState(false)
  const isMobile = useMediaQuery('(max-width: 680px)')

  const { isId, fetchingId } = useSelector(selectUser())

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
              <div style={{ backgroundImage: `url(${url})` }} className={classes.NFTPhoto} />
              {isEdit ? (
                <>
                  <Typography className={classes.NFTLink}>Link</Typography>
                  <TextField
                    type="input"
                    name="link"
                    variant="outlined"
                    className={classes.formField}
                    value={item_id}
                    onChange={onChangePromotion}
                    InputProps={{
                      classes: {
                        notchedOutline: classes.borderedInput,
                      },
                    }}
                  />
                  <Box className={clsx(classes.flexBoxInit, classes.actionButtonsContainer)}>
                    <IconButton
                      disabled={fetchingId || !isId}
                      className={classes.CheckedIcon}
                      onClick={() => {
                        onAddPromotion()
                        setIsEdit(false)
                      }}
                    >
                      <CheckedIcon />
                    </IconButton>
                    <IconButton className={classes.CloseIcon} onClick={() => setIsEdit(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <>
                  <Typography component={'span'} className={classes.NFTName}>
                    {name}
                  </Typography>
                  <IconButton className={classes.EditIcon} onClick={() => setIsEdit(true)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton className={classes.DeleteIcon} onClick={onDeletePromotion}>
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
