import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: theme.spacing(2),
    },
    helperTextWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(1),
      minHeight: 18,
    },
    helperText: {
      margin: theme.spacing(0, 1),
    },
    inputBackground: {
      backgroundColor: theme.palette.background.paper,
    },
    description: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.greyDark,
      marginBottom: theme.spacing(2),
    },
    textInput: {
      backgroundColor: 'unset',
      '&>div>input:-webkit-autofill': {
        '-webkit-box-shadow': `0 0 0 100px ${theme.palette.background.paper} inset`,
      },
    },
    numberInput: {
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
    },
    star: {
      '&::after': {
        content: "'*'",
        display: 'inline-block',
        color: theme.palette.warning.main,
      },
    },
    counter: {
      fontSize: 14,
      fontWeight: 700,
      textAlign: 'right',
      marginLeft: 'auto',
    },
  })
)
