import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import { ICustomChipProps } from './types'
import { useStyles } from './styles'
import { useHistory } from 'react-router-dom'
import routes from '../../routes'

export default function CustomChip(props: ICustomChipProps) {
  const { avatar, children, startIcon = false, endIcon = false, classNames = {} } = props
  const classes = useStyles()
  const history = useHistory()

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
      onClick={() => history.push(routes.bids)}
    >
      {children}
    </Button>
  )
}
