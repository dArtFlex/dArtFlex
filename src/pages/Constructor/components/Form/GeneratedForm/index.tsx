import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { selectConstructor } from 'stores/selectors'
import { Box, Button, Typography } from '@material-ui/core'
import { CircularProgressLoader } from 'common'
import { ArrowLeftIcon, DownloadIcon, RefreshIcon } from 'common/icons'
import { useStyles } from './styles'
import { Loadable } from 'utils'

export default function GeneratedConstructorFrom() {
  const classes = useStyles()
  const { fetching, imageUrl } = useSelector(selectConstructor())

  return (
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
        <Button variant={'text'} startIcon={<ArrowLeftIcon />} className={classes.btnBack}>
          Back
        </Button>
        <Box mb={10}>
          {fetching ? (
            <Typography variant={'h1'}>Generating process!</Typography>
          ) : (
            <Typography variant={'h1'}>Here is your unique picture!</Typography>
          )}
        </Box>
        <Button variant={'contained'} fullWidth className={classes.btnDownload} startIcon={<DownloadIcon />}>
          Download
        </Button>
        <Box className={classes.btnSecondaryGroup}>
          <Button variant={'outlined'} className={classes.btnSecondary} startIcon={<RefreshIcon />}>
            Regenerate
          </Button>
          <Button variant={'outlined'} className={classes.btnSecondary}>
            Add to my album
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
