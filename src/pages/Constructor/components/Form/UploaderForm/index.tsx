import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Button } from '@material-ui/core'
import { DropZone, ImagePreview } from '../../../components'
import { CloseIcon } from 'common/icons'
import { IConstructor } from '../../../types'
import { useStyles } from './styles'

export default function UploaderConstructorForm({
  setFilesSource,
  onSyncBack,
}: {
  setFilesSource: () => void
  onSyncBack: () => void
}) {
  const classes = useStyles()
  const { values, handleSubmit, setFieldValue } = useFormikContext<IConstructor>()

  const disabled = !values.file0 || !values.file1

  const handleRouteChange = () => {
    if (typeof window !== 'undefined') {
      if (!window.location.search) {
        onSyncBack()
      }
    }
  }

  useEffect(() => {
    setFieldValue('file0', null)
    setFieldValue('file1', null)
    const iId = setInterval(() => {
      handleRouteChange()
    }, 250)
    return () => {
      clearInterval(iId)
    }
  }, [])

  return (
    <Box className={classes.uploaderContainer}>
      <Box className={classes.dropZones}>
        {values.file0 ? (
          <Box className={classes.previewCard}>
            <ImagePreview file={(values.file0 as unknown) as File} />
            <Button
              color={'secondary'}
              variant={'outlined'}
              className={classes.btnClose}
              onClick={() => setFieldValue('file0', null)}
            >
              <CloseIcon />
            </Button>
          </Box>
        ) : (
          <DropZone name="file0" title={'Upload First Photo'} />
        )}
        {values.file1 ? (
          <Box className={classes.previewCard}>
            <ImagePreview file={(values.file1 as unknown) as File} />
            <Button
              color={'secondary'}
              variant={'outlined'}
              className={classes.btnClose}
              onClick={() => setFieldValue('file1', null)}
            >
              <CloseIcon />
            </Button>
          </Box>
        ) : (
          <DropZone name="file1" title={'Upload Second Photo'} />
        )}
      </Box>
      <Button
        variant={'contained'}
        color={disabled ? 'secondary' : 'primary'}
        className={classes.btnGenerate}
        disabled={disabled}
        onClick={() => {
          handleSubmit()
          setFilesSource()
        }}
      >
        <Typography className={classes.btnText}>Generate</Typography>
      </Button>
    </Box>
  )
}
