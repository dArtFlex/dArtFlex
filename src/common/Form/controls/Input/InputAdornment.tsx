import React from 'react'
import { InputAdornment as MUIInputAdornment, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    placeholder: {
      fontSize: 16,
      fontWeight: 700,
      paddingLeft: theme.spacing(2.5),
      marginTop: theme.spacing(0.25),
    },
  })
)

interface IInputAdornmentProps {
  icon?: JSX.Element
  placeholder?: string | React.ReactNode
  position?: 'start' | 'end'
}

export default function InputAdornment(props: IInputAdornmentProps) {
  const { icon, placeholder, position = 'start' } = props
  const classes = useStyles()

  return (
    <MUIInputAdornment position={position}>
      {icon}
      <Typography className={classes.placeholder}>{placeholder}</Typography>
    </MUIInputAdornment>
  )
}
