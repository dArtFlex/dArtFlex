import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      maxWidth: 325,
      width: '100%',
      height: 448,
      background: theme.palette.background.default,
      borderRadius: theme.spacing(3),
    },
    cardImageContainer: {
      paddingTop: theme.spacing(1),
    },
    cardImage: {
      height: 242,
      width: 256,
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: theme.spacing(3),
      },
      '&:hover': {
        cursor: 'zoom-in',
      },
    },
    cardContent: {
      padding: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      justifyContent: 'space-between',
    },
    cardInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    cardInfoUser: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 8,
      paddingBottom: theme.spacing(4),
    },
    avatar: {
      width: 32,
      height: 32,
    },
    cardDesc: {
      fontSize: 21,
      fontWeight: 700,
      height: 50,
      marginBottom: theme.spacing(4),
      color: theme.palette.text.primary,
      overflow: 'hidden',
    },
    btn: {
      borded: `2px solid ${theme.palette.text.primary}`,
    },
    cardForm: {
      maxWidth: 478,
      padding: theme.spacing(8, 13),
    },
    confirming: {
      maxWidth: 325,
      justifySelf: 'center',
      alignSelf: 'center',
    },
    loader: {
      display: 'inline-box',
    },
    empyName: {
      height: 27,
      maxWidth: 216,
      background: theme.palette.greyMid,
      borderRadius: theme.spacing(1),
    },
    btnView: {
      border: `2px solid ${theme.palette.text.primary}`,
    },
  })
)
