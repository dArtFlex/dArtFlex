import React, { Suspense, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectConstructor, selectUser, selectWallet } from 'stores/selectors'
import { Box, Button, Typography } from '@material-ui/core'
import { CircularProgressLoader, Modal, WalletConnect } from 'common'
import { ArrowLeftIcon, DownloadIcon, RefreshIcon } from 'common/icons'
import { addImageToAlbumRequest } from 'stores/reducers/album'
import { useStyles } from './styles'
import { Loadable, handleDownload } from 'utils'

export default function GeneratedConstructorFrom({ setFilesSource }: { setFilesSource: () => void }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { fetching, imageUrl } = useSelector(selectConstructor())
  const { user } = useSelector(selectUser())
  const { wallet } = useSelector(selectWallet())

  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Box className={classes.generatedContainer}>
        <Box className={classes.imageBox}>
          {fetching ? (
            <CircularProgressLoader />
          ) : (
            <Suspense fallback={<CircularProgressLoader />}>
              <Loadable.Image src={imageUrl} className={classes.image} />
            </Suspense>
          )}
        </Box>
        <Box className={classes.genetatedForm}>
          <Button variant={'text'} startIcon={<ArrowLeftIcon />} className={classes.btnBack} onClick={setFilesSource}>
            Back
          </Button>
          <Box mb={10}>
            {fetching ? (
              <Typography variant={'h1'}>Generating process!</Typography>
            ) : (
              <Typography variant={'h1'}>Here is your unique picture!</Typography>
            )}
          </Box>
          <Button
            variant={'contained'}
            fullWidth
            className={classes.btnDownload}
            startIcon={<DownloadIcon />}
            onClick={() => handleDownload(imageUrl)}
          >
            Download
          </Button>
          <Box className={classes.btnSecondaryGroup}>
            <Button
              variant={'outlined'}
              className={classes.btnSecondary}
              startIcon={<RefreshIcon />}
              onClick={setFilesSource}
            >
              Regenerate
            </Button>
            <Button
              variant={'outlined'}
              className={classes.btnSecondary}
              onClick={() => {
                if (!wallet) {
                  return setOpen(true)
                }
                dispatch(addImageToAlbumRequest({ imageUrl, userId: user?.id }))
              }}
            >
              Add to my album
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        body={<WalletConnect onClose={() => setOpen(false)} />}
        withAside
      />
    </>
  )
}
