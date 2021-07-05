import React from 'react'
import { Modal as MUIModal, Box, Grid, Button } from '@material-ui/core'
import { CloseIcon } from 'common/icons'
import { noop } from 'lodash'
import { IModalProps } from './types'
import { modalBgUrl } from 'common/icons/bgUrl'
import { useStyles } from './styles'

export default function Modal(props: IModalProps) {
  const { open, onClose = noop, classNames = {}, body, withAside = false, ...rest } = props
  const classes = useStyles()

  return (
    <MUIModal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
      classes={classNames}
      open={open}
      onClose={onClose}
      {...rest}
    >
      <Box className={classes.paper}>
        {withAside && (
          <aside className={classes.aside}>
            <img src={modalBgUrl} />
          </aside>
        )}
        <Grid container justify="center">
          <Button onClick={onClose} color={'secondary'} variant={'outlined'} className={classes.modalBtnClose}>
            <CloseIcon />
          </Button>
          {body}
        </Grid>
      </Box>
    </MUIModal>
  )
}
