import React from 'react'
import { Slider as MUISlider, Box } from '@material-ui/core'
import { useStyles } from './styles'

export default function Slider() {
  const classes = useStyles()
  return (
    <Box className={classes.containter}>
      <MUISlider
        classes={{
          root: classes.root,
          thumb: classes.thumb,
          active: classes.active,
          valueLabel: classes.valueLabel,
          track: classes.track,
          rail: classes.rail,
        }}
        aria-label="slider"
        defaultValue={20}
      />
    </Box>
  )
}
