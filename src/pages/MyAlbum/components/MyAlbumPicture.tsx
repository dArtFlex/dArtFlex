import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useStyles } from '../styles'
import { Box, Button, IconButton, Modal, Typography } from '@material-ui/core'
import { DownloadIcon, PlusHugeIcon, TrashIcon, ZoomIcon } from 'common/icons'
import { setAlbumImage } from 'stores/reducers/minting'
import { deleteImageFromAlbumRequest } from 'stores/reducers/album'
import { handleDownload, imageUrlToFile } from 'utils'
import clsx from 'clsx'
import routes from 'routes'

interface IMyAlbumPicture {
  src: string
  id: number
}

export default function MyAlbumPicture(props: IMyAlbumPicture) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { src, id } = props
  const [isPicMenuActive, setIsPicMenuActive] = useState(false)
  const [dialogType, setDialogType] = useState('')

  function openModal(type: string) {
    setIsPicMenuActive(false)
    setDialogType(type)
  }

  const handleMinting = async () => {
    const file = await imageUrlToFile(src)
    dispatch(setAlbumImage({ file, image: src }))
    history.push(routes.createNFT)
  }

  return (
    <>
      <Box
        className={clsx(classes.myAlbumPicWrapper, isPicMenuActive && classes.myAlbumPicWrapperHover)}
        onMouseMove={() => !dialogType && setIsPicMenuActive(true)}
        onMouseLeave={() => setIsPicMenuActive(false)}
      >
        <img src={src} className={isPicMenuActive ? classes.picWrapperHover : ''} />
        {isPicMenuActive && (
          <Box className={classes.picMenuBox} onClick={() => openModal('zoom')}>
            <ZoomIcon />
            <Box className={classes.albumActionBtns}>
              <IconButton
                className={clsx(classes.albumActionButton, classes.deleteIcon)}
                onClick={(e) => {
                  e.stopPropagation()
                  openModal('delete')
                }}
              >
                <TrashIcon />
              </IconButton>
              <IconButton
                className={classes.albumActionButton}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload(src)
                }}
              >
                <DownloadIcon />
              </IconButton>
              <IconButton
                className={classes.albumActionButton}
                onClick={(e) => {
                  e.stopPropagation()
                  handleMinting()
                }}
              >
                <Typography component={'span'}>Upload</Typography>
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      <Modal open={dialogType === 'delete'} className={classes.modalWrapper}>
        <Box className={classes.modalContent}>
          <Box className={classes.buttonWrapper}>
            <IconButton className={classes.dialogCloseIcon} onClick={() => setDialogType('')}>
              <PlusHugeIcon />
            </IconButton>
          </Box>
          <Box className={classes.modalInfo}>
            <Typography variant={'h2'}>Delete Artwork?</Typography>
          </Box>
          <Box className={classes.modalButtons}>
            <Button
              className={classes.deleteButton}
              onClick={() => {
                dispatch(deleteImageFromAlbumRequest({ imageId: id }))
                setDialogType('')
              }}
            >
              Yes, Delete
            </Button>
            <Button onClick={() => setDialogType('')} className={classes.cancelButton}>
              No, Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={dialogType === 'zoom'} className={classes.modalWrapper} onBackdropClick={() => setDialogType('')}>
        <>
          <Box>
            <IconButton
              className={clsx(classes.dialogCloseIcon, classes.zoomCloseIcon)}
              onClick={() => setDialogType('')}
            >
              <PlusHugeIcon />
            </IconButton>
          </Box>
          <Box className={classes.flexBoxColumn}>
            <img src={src} className={classes.zoomImage} />
            <Box className={classes.zoomButtons}>
              <Button
                className={classes.deleteButton}
                onClick={(e) => {
                  e.stopPropagation()
                  openModal('delete')
                }}
                startIcon={<TrashIcon />}
              >
                Delete
              </Button>
              <Button
                className={classes.downloadButton}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload(src)
                }}
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
              <Button
                className={classes.uploadButton}
                onClick={(e) => {
                  e.stopPropagation()
                  handleMinting()
                }}
              >
                Upload
              </Button>
            </Box>
          </Box>
        </>
      </Modal>
    </>
  )
}
