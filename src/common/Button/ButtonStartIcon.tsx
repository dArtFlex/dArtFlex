import React from 'react'
import clsx from 'clsx'
import { Button, Box, ButtonProps, createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      position: 'relative',
      height: 50,
    },
    iconBox: {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      left: 36,
      transform: 'translate(-50%, -50%)',
    },
  })
)

interface IButtonStartIconProps extends ButtonProps {
  icon: JSX.Element
  text?: React.ReactChildren
  classNames?: string
}

export default function ButtonStartIcon(props: IButtonStartIconProps) {
  const { icon, children, classNames = '', ...rest } = props
  const classes = useStyles()

  return (
    <Button disableElevation className={clsx(classes.button, classNames)} {...rest}>
      <Box className={classes.iconBox}>{icon}</Box>
      {children}
    </Button>
  )
}
