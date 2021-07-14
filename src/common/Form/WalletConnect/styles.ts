import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    walletConnect: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      maxWidth: 336,
      height: '100%',
      flexDirection: 'column',
    },
    walletConnectText: {
      color: theme.palette.text.primary,
    },
    walletConnectDesc: {
      fontSize: 16,
      marginTop: theme.spacing(4),
      fontWeight: 'normal',
      color: theme.palette.text.primary,
    },
    walletConnectBtn: {
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.background.default,
    },
    connectBtnContainer: {
      width: '100%',
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      '& button': {
        marginBottom: theme.spacing(4),
      },
      '& button:last-child': {
        marginBottom: 0,
      },
    },
    walletTermLink: {
      fontWeight: 700,
    },
    walletLearnMoreLink: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.primary.main,
    },
  })
)
