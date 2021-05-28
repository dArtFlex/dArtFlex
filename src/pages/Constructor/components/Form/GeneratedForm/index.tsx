import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { Image } from 'common'
import { ArrowLeftIcon, DownloadIcon, RefreshIcon } from 'common/icons'
import { useStyles } from './styles'

export default function GeneratedConstructorFrom() {
  const classes = useStyles()
  return (
    <Box className={classes.generatedContainer}>
      <Box className={classes.imageBox}>
        <Image src={'https://picsum.photos/500/500'} className={classes.image} />
      </Box>
      <Box className={classes.genetatedForm}>
        <Button variant={'text'} startIcon={<ArrowLeftIcon />} className={classes.btnBack}>
          Back
        </Button>
        <Box mb={10}>
          <Typography variant={'h1'}>Here is your unique picture!</Typography>
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
