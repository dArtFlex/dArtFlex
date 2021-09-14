import React from 'react'
import clsx from 'clsx'
import { Box } from '@material-ui/core'
import { useStyles } from './styles'

interface ICustomTooltipProps {
  children: JSX.Element | string
  text: string
  shiftX?: number
  shiftY?: number
  background?: string
}

export default function CustomTooltip(props: ICustomTooltipProps) {
  const { children, text, shiftY = -27, shiftX = -7, background } = props
  const classes = useStyles({ background })

  return (
    <>
      <Box className={classes.root}>
        {children}
        <Box className={clsx(classes.customTooltip)} style={{ top: shiftY, left: shiftX }}>
          {text}
        </Box>
      </Box>
    </>
  )
}
