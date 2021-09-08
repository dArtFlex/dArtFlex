import React, { useState } from 'react'
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
  const { children, text, shiftY = -144, shiftX = 0 } = props
  const [isShown, setIsShown] = useState(false)
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  })

  return (
    <>
      <Box
        className={classes.root}
        onMouseMove={(e) => {
          setIsShown(true)
          setOffset({ x: e.screenX, y: e.screenY })
        }}
        onMouseLeave={() => setIsShown(false)}
      >
        {children}
      </Box>
      {isShown && (
        <Box className={classes.tooltip} style={{ top: offset.y + shiftY, left: offset.x + shiftX }}>
          {text}
        </Box>
      )}
    </>
  )
}
