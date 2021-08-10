import React from 'react'
import { Slider as MUISlider, Box } from '@material-ui/core'
import { useStyles } from './styles'
import { ISliderProps } from './types'

export default function Slider(props: ISliderProps) {
  const classes = useStyles()
  const { defaultValue = 0, min = 0, max = 100 } = props
  return (
    <Box className={classes.containter}>
      <MUISlider
        {...props}
        classes={{
          root: classes.root,
          thumb: classes.thumb,
          active: classes.active,
          valueLabel: classes.valueLabel,
          track: classes.track,
          rail: classes.rail,
        }}
        aria-labelledby="input-slider"
        aria-label="slider"
        defaultValue={defaultValue}
        min={min}
        max={max}
      />
    </Box>
  )
}
