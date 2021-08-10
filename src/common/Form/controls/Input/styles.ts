import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: theme.spacing(2),
    },
    description: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.greyDark,
      marginBottom: theme.spacing(2),
    },
    textInput: {
      backgroundColor: theme.palette.background.paper,
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
      marginTop: theme.spacing(1),
    },
  })
)
