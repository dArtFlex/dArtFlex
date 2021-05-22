import React from 'react'
import { Box, CircularProgress, makeStyles, createStyles } from '@material-ui/core'
import { CircularProgressLoaderProps, StylesConfig } from './types'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'grid',
      placeContent: 'center',
      width: '100%',
      height: ({ height }: StylesConfig) => (height === 'fullScreen' ? '100vh' : 'auto'),
    },
    circle: {
      opacity: 0.8,
    },
  })
)

export default function CircularProgressLoader(props: CircularProgressLoaderProps) {
  const { height, size = 48, color = 'primary' } = props
  const classes = useStyles({ height })

  return (
    <Box className={classes.container}>
      <CircularProgress
        thickness={7}
        classes={{
          circle: classes.circle,
        }}
        size={size}
        color={color}
      />
    </Box>
  )
}
