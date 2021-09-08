import React from 'react'
import clsx from 'clsx'
import { Box, Typography, Tooltip as MUITooltip } from '@material-ui/core'
import { InfoIcon } from 'common/icons'
import { useStyles } from './styles'
import CustomTooltip from './CustomTooltip'

export { CustomTooltip }
interface ITooltipProps {
  desc: string | React.ReactElement
  text?: string
  icon?: JSX.Element
  className?: string
}
// Todo: Should be implemented mobile version
export default function Tooltip(props: ITooltipProps) {
  const classes = useStyles()
  const { icon = <InfoIcon className={classes.tooltipIcon} />, text, desc, className = '' } = props
  return (
    <Box className={clsx(classes.infoRowIcon, className)}>
      <Typography className={classes.helperText}>{text}</Typography>
      <MUITooltip classes={{ tooltip: classes.tooltip }} title={desc}>
        {icon}
      </MUITooltip>
    </Box>
  )
}
