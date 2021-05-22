import React from 'react'
import { Box, Typography, Tooltip as MUITooltip } from '@material-ui/core'
import { InfoIcon } from 'common/icons'
import { useStyles } from './styles'

interface ITooltipProps {
  desc: string | React.ReactElement
  text?: string
  icon?: JSX.Element
}

export default function Tooltip(props: ITooltipProps) {
  const { icon = <InfoIcon />, text, desc } = props
  const classes = useStyles()
  return (
    <Box className={classes.infoRowIcon}>
      <Typography className={classes.helperText}>{text}</Typography>
      <MUITooltip classes={{ tooltip: classes.tooltip }} title={desc}>
        {icon}
      </MUITooltip>
    </Box>
  )
}
