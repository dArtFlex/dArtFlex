import React from 'react'

import { FormControlProps, FormHelperText, FormControl as MUIFormControl, makeStyles, Theme } from '@material-ui/core'

import clsx from 'clsx'

interface IFormControlProps extends Pick<FormControlProps, 'error' | 'className' | 'children'> {
  errorText?: string
  helperText?: React.ReactNode
  gap?: boolean
  fullWidth?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(6),
  },
  helperText: {
    minHeight: 18,
    fontSize: 12,
    lineHeight: '16px',
    padding: theme.spacing(0, 3),
    marginTop: 0,
  },
}))

export default function FormControl(props: IFormControlProps) {
  const classes = useStyles()
  const { children, className, error, errorText, helperText, gap = true, fullWidth = true } = props

  const showHelperText = gap || error || helperText

  return (
    <MUIFormControl margin="none" error={error} fullWidth={fullWidth} className={clsx(classes.root, className)}>
      {children}
      {showHelperText && (
        <FormHelperText className={classes.helperText}>{error ? errorText : helperText}</FormHelperText>
      )}
    </MUIFormControl>
  )
}
