import React from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Button } from '@material-ui/core'
import { DropZone, ImagePreview } from '../../../components'
import { CloseIcon } from 'common/icons'
import { IConstructor } from '../../../types'
import { useStyles } from './styles'

export default function UploaderConstructorForm({ setFilesSource }: { setFilesSource: () => void }) {
  const classes = useStyles()
  const { values } = useFormikContext<IConstructor>()

  const disabled = typeof values.file0 !== 'object' || typeof values.file1 !== 'object'

  return (
    <Box className={classes.uploaderContainer}>
      <Box className={classes.dropZones}>
        {values.file0 ? (
          <Box className={classes.previewCard}>
            <ImagePreview file={values.file0 as unknown as File} />
            <Button color={'secondary'} variant={'outlined'} className={classes.btnClose}>
              <CloseIcon />
            </Button>
          </Box>
        ) : (
          <DropZone name="file0" title={'Upload First Photo'} />
        )}
        {values.file1 ? (
          <Box className={classes.previewCard}>
            <ImagePreview file={values.file1 as unknown as File} />
            <Button color={'secondary'} variant={'outlined'} className={classes.btnClose}>
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
        onClick={setFilesSource}
      >
        <Typography className={classes.btnText}>Generate</Typography>
      </Button>
    </Box>
  )
}
