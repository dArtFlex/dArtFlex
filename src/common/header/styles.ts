import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      marginRight: theme.spacing(16),
      [theme.breakpoints.down(840)]: {
        marginRight: theme.spacing(4),
      },
    },
    mobileToolBar: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
    },
    iconButton: {
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
    rightBlock: {
      marginLeft: 'auto',
    },
    toolbar: {
      backgroundColor: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.grey['100']}`,
    },
    navTabs: {
      padding: theme.spacing(5, 0),
      color: `${theme.palette.text.primary} !important`,
      [theme.breakpoints.down(740)]: {
        padding: theme.spacing(2, 0),
      },
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
    indicatorNonActive: {
      visibility: 'hidden',
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      padding: theme.spacing(3, 0),
      '&>button+button': {
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down(780)]: {
          marginLeft: theme.spacing(2),
        },
      },
    },
    buttonWallet: {
      borderColor: theme.palette.grey['200'],
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.down(690)]: {
        padding: theme.spacing(2, 3),
      },
    },
    notification: {
      margin: theme.spacing(0, 6),
    },
    notificationIcon: {
      fill: theme.palette.text.primary,
    },
    themeIcon: {
      color: theme.palette.text.primary,
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
    notificationButton: {
      [theme.breakpoints.down(690)]: {
        marginRight: theme.spacing(2),
        padding: theme.spacing(2),
      },
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
      width: `45px !important`,
      height: 45,
      borderRadius: theme.spacing(2),
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
      [theme.breakpoints.down(741)]: {
        padding: theme.spacing(2),
      },
    },
    mobileMenuWrapper: {
      zIndex: 1100,
    },
    mobileMenuContent: {
      width: '100vw',
      height: '100vh',
      padding: theme.spacing(2, 4, 8, 4),
    },
    mobileMenuUserInfo: {
      width: '100vw',
      height: '100vh',
      borderRadius: 'unset',
    },
    mobileMenuActionButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    mobileUserStatsWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(6, 4, 6, 6),
      borderBottom: `1px solid ${theme.palette.grey['200']}`,
    },
    mobileActionButtonsWrapper: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.palette.grey['200']}`,
    },
    profileTabsWrapper: {
      padding: theme.spacing(4, 0),
      width: '100%',
    },
    bidsCount: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white,
      borderRadius: '100%',
      marginLeft: theme.spacing(3),
      minWidth: 24,
      textAlign: 'center',
    },
    navTabsBlock: {
      marginTop: theme.spacing(24),
      marginLeft: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
