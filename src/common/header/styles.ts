import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      marginRight: theme.spacing(16),
    },
    toolbar: {
      backgroundColor: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.greyLight}`,
    },
    navTabs: {
      padding: theme.spacing(5, 0),
      color: `${theme.palette.text.primary} !important`,
    },
    navTabsContainer: {
      '&>div>div': {
        borderBottom: 'none',
      },
    },
    indicator: {
      backgroundColor: theme.palette.text.primary,
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      padding: theme.spacing(3, 0),
      '&>button+button': {
        marginLeft: theme.spacing(4),
      },
    },
    buttonWallet: {
      borderColor: theme.palette.grey['200'],
      backgroundColor: theme.palette.background.default,
    },
    notification: {
      margin: theme.spacing(0, 6),
    },
    notificationIcon: {
      fill: theme.palette.text.primary,
    },

    notificationContainer: {
      padding: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
    notificationBadge: {
      background: theme.palette.redMiddle,
      width: 10,
      height: 10,
      borderRadius: '50%',
      border: `2px solid ${theme.palette.white}`,
      top: 5,
      right: 3,
    },
    notificationCard: {
      minWidth: 428,
      background: theme.palette.greyPale,
      padding: theme.spacing(3),
      borderRadius: 12,
      cursor: 'pointer',
    },
    notificationBadgeUnread: {
      background: theme.palette.primary.light,
    },
    notificationCardBadge: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: theme.palette.primary.main,
      top: '50%',
      left: -10,
    },
    notificationCardBox: {
      display: 'flex',
      flexWrap: 'nowrap',
    },
    notificationImage: {
      width: 45,
      height: 45,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(3),
    },
    notificationContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      paddingLeft: theme.spacing(3),
    },
    avatar: {
      width: 32,
      height: 32,
    },
    createButton: {
      border: `2px solid ${theme.palette.grey.A100}`,
    },
  })
)
