import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      maxWidth: 336,
      padding: theme.spacing(8, 0, 12),
    },
    section: {
      paddingBottom: theme.spacing(10),
    },
    sectionHead: {
      fontSize: 16,
      color: theme.palette.text.primary,
      paddingBottom: theme.spacing(2),
    },
    sectionDesc: {
      fontSize: 16,
      color: theme.palette.greyDark,
      paddingBottom: theme.spacing(4),
    },
    icon: {
      fill: theme.palette.text.primary,
    },
    postTweetBtn: {
      border: `2px solid ${theme.palette.text.primary}`,
    },
    verifyBtn: {
      background: theme.palette.text.primary,
      color: theme.palette.background.default,
      minWidth: 144,
    },
    verifiedHead: {
      fontSize: 24,
      fontWeight: 700,
    },
    verifiedBox: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '-112px',
      gap: theme.spacing(8),
    },
  })
)
