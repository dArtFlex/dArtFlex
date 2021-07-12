import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import { ICustomChipProps } from './types'
import { useStyles } from './styles'

export default function CustomChip(props: ICustomChipProps) {
  const { avatar, children, startIcon = false, endIcon = false, classNames = {} } = props
  const classes = useStyles()

  const Component = (
    <Avatar classes={{ root: classNames.avatarRoot }} className={classes.avatar}>
      {avatar}
    </Avatar>
  )

  return (
    <Button
      classes={{
        root: classNames.buttonRoot,
      }}
      className={classes.chipBtn}
      variant={'text'}
      // color={'primary'}
      disableElevation
      startIcon={startIcon && Component}
      endIcon={endIcon && Component}
    >
      {children}
    </Button>
  )
}
