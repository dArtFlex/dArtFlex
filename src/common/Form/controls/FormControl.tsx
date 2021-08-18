import React from 'react'

import { FormControlProps, FormHelperText, FormControl as MUIFormControl, makeStyles, Theme } from '@material-ui/core'

import clsx from 'clsx'

interface IFormControlProps extends Pick<FormControlProps, 'error' | 'className' | 'children'> {
  errorText?: React.ReactNode | string
  helperText?: React.ReactNode | string
  gap?: boolean
  fullWidth?: boolean
  variant?: 'filled' | 'outlined' | 'standard'
}

type Display = {
  display: 'inline-flex' | 'flex'
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: ({ display }: Display) => display,
    marginBottom: ({ display }: Display) => (display === 'inline-flex' ? 0 : theme.spacing(6)),
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.default,
  },
  helperText: {
    fontSize: 12,
    lineHeight: '16px',
    padding: theme.spacing(0, 3),
    marginTop: 0,
  },
}))

export default function FormControl(props: IFormControlProps) {
  const { children, className, error, errorText = '', helperText = '', gap = false, fullWidth = true, variant } = props
  const classes = useStyles({ display: fullWidth ? 'flex' : 'inline-flex' })

  const showHelperText = gap || error || helperText

  return (
    <MUIFormControl
      margin="none"
      error={error}
      fullWidth={fullWidth}
      className={clsx(classes.root, className)}
      variant={variant}
    >
      {children}
      <FormHelperText className={classes.helperText}>{error ? errorText : helperText}</FormHelperText>
    </MUIFormControl>
  )
}
