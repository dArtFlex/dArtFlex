import React from 'react'
import { Card, Box, Typography, Button } from '@material-ui/core'
import { Image } from 'common'
import { ISelectedPreview } from './types'
import { useStyles } from './styles'

export default function SelectedPreview(props: ISelectedPreview) {
  const { file0, file1, onClick } = props
  const classes = useStyles()
  const selected = file0 && file1 ? '0/2' : '1/2'

  return (
    <Card className={classes.popper}>
      <Box className={classes.cardImages}>
        <Box className={classes.cardImage}>
          {file0 ? (
            <Image file={file0} className={classes.image} />
          ) : (
            <Typography className={classes.imageNumber}>1</Typography>
          )}
        </Box>
        <Box className={classes.cardImage}>
          {file1 ? (
            <Image file={file1} className={classes.image} />
          ) : (
            <Typography className={classes.imageNumber}>2</Typography>
          )}
        </Box>
      </Box>
      <Button
        variant={'contained'}
        color={Boolean(!file0) && Boolean(!file1) ? 'secondary' : 'primary'}
        className={classes.btnSelected}
        disabled={Boolean(!file0) && Boolean(!file1)}
        onClick={onClick}
      >
        <Typography className={classes.btnText}>
          {Boolean(file0) && Boolean(file1) ? 'Generate!' : `${selected} selected`}
        </Typography>
      </Button>
    </Card>
  )
}
