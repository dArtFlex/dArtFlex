import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(6),
      minWidth: 325,
      [theme.breakpoints.down(375)]: {
        minWidth: '96vw',
      },
    },
    avatar: {
      width: 115,
      height: 115,
    },
    badgeRoot: {
      alignSelf: 'center',
      marginBottom: theme.spacing(4),
    },
    badge: {
      bottom: 12,
      right: 12,
      '& svg': {
        width: 35,
      },
    },
    name: {
      fontSize: 30,
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingBottom: theme.spacing(1),
      textAlign: 'center',
    },
    userName: {
      fontSize: 24,
      fontWeight: 700,
      color: theme.palette.lightViolet,
      paddingBottom: theme.spacing(1),
      textAlign: 'center',
    },
    actionText: {
      color: theme.palette.lightViolet,
    },
    text: {
      fontSize: 16,
      fontWeight: 400,
    },
    wallet: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: theme.spacing(7.5),
      gap: theme.spacing(1),
    },
    linkBox: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: theme.spacing(5.5),
    },
    link: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingLeft: theme.spacing(3.5),
    },
    shareBtnCotainer: {
      display: 'flex',
      gap: theme.spacing(3),
      justifyContent: 'center',
      padding: theme.spacing(4, 0, 6),
    },
    borderdIconButton: {
      border: `1px solid ${theme.palette.secondary.main}`,
    },
    icon: {
      fill: theme.palette.text.primary,
    },
    linksTitle: {
      padding: theme.spacing(5, 8, 0, 8),
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.text.secondary,
    },
  })
)
