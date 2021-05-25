import React from 'react'
import { Modal, Button } from '@material-ui/core'
import { Image } from 'common'
import { CloseIcon } from 'common/icons'
import { IImageViewer } from './types'
import { useStyles } from './styles'

export default function ImageViewer(props: IImageViewer) {
  const { asFiles = false, images = [], open = false, onClose } = props
  const classes = useStyles()

  if (!open) {
    return null
  }

  return (
    <Modal disablePortal disableEnforceFocus disableAutoFocus open className={classes.modal}>
      <>
        <Button onClick={onClose} color={'secondary'} variant={'outlined'} className={classes.modalBtnClose}>
          <CloseIcon />
        </Button>

        {asFiles ? (
          <Image file={images[0] as File} classNames={classes.cardImage} />
        ) : (
          <Image src={images[0] as string} classNames={classes.cardImage} />
        )}
      </>
    </Modal>
  )
}
