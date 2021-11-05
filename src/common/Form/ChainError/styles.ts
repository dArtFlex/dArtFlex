import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    walletError: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      maxWidth: 336,
      height: '100%',
      flexDirection: 'column',
    },
    walletErrorDesc: {
      color: theme.palette.text.primary,
      fontSize: 16,
      marginTop: theme.spacing(4),
      fontWeight: 'normal',
    },
    walletErrorText: {
      color: theme.palette.text.primary,
    },
    errorBtn: {
      position: 'relative',
      height: 50,
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      background: theme.palette.text.primary,
      color: theme.palette.background.default,
      '&:hover': {
        background: theme.palette.text.primary,
      },
    },
  })
)
