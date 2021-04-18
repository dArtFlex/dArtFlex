import React from 'react'
import { MenuItem, MenuItemProps, Box } from '@material-ui/core'
import { CheckedIcon } from '../icons'
import { useStyles } from './styles'

export default function StyledCheckedMenuItem(props: MenuItemProps) {
  const classes = useStyles()
  return (
    <MenuItem
      {...props}
      button={props.button || undefined}
      classes={{ root: classes.root, selected: classes.selected }}
    >
      <Box className={classes.checkIcon}>
        <CheckedIcon />
      </Box>
      {props.children}
    </MenuItem>
  )
}
