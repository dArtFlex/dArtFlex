import React from 'react'
import clsx from 'clsx'
import { Box } from '@material-ui/core'
import { useStyles } from './styles'

interface ICustomTooltipProps {
  children: JSX.Element
  text: string
  shiftX?: number
  shiftY?: number
}

export default function CustomTooltip(props: ICustomTooltipProps) {
  const classes = useStyles()
  const { children, text, shiftY = -27, shiftX = -7 } = props

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
