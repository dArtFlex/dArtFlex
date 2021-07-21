import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      marginRight: theme.spacing(16),
      [theme.breakpoints.down(760)]: {
        marginRight: theme.spacing(8),
      },
    },
    mobileToolBar: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
    },
    iconButton: {
      marginRight: theme.spacing(4),
      position: 'relative',
      '& span': {
        width: 32,
      },
    },
    borderedIcon: {
      color: theme.palette.text.primary,
      marginLeft: theme.spacing(4),
      border: `1px solid ${theme.palette.greyMid}`,
    },
    toolbar: {
      backgroundColor: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.grey['100']}`,
    },
    navTabs: {
      padding: theme.spacing(5, 0),
      color: `${theme.palette.text.primary} !important`,
    },
    navTabsMobile: {
      fontSize: 30,
      fontWeight: 700,
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
      color: theme.palette.primary.contrastText,
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
      backgroundColor: theme.palette.background.default,
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
      background: theme.palette.grey['100'],
      padding: theme.spacing(3),
      borderRadius: 12,
      cursor: 'pointer',
    },
    notificationBadgeUnread: {
      background: theme.palette.warning.light,
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
    mobileMenuWrapper: {
      zIndex: 1100,
    },
    mobileMenuContent: {
      width: '100vw',
      height: '100vh',
      padding: theme.spacing(6, 4, 8, 4),
    },
    mobileMenuUserInfo: {
      width: '100vw',
      height: '100vh',
      padding: theme.spacing(6, 4, 6, 6),
    },
    mobileMenuActionButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    navTabsBlock: {
      marginTop: theme.spacing(24),
      marginLeft: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
    },
    mobileMenuProfileButtons: {
      marginTop: theme.spacing(20),
      '& button': {
        marginBottom: theme.spacing(4),
      },
    },
    profileIcon: {
      display: 'flex',
      alignItems: 'center',
      width: 40,
      height: 40,
    },
    textSmallBold: {
      fontSize: 14,
      fontWeight: 700,
      marginLeft: theme.spacing(4),
    },
  })
)
