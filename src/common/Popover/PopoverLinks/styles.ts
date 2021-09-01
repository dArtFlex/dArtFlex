import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    externalLinkMenu: {
      padding: theme.spacing(0),
    },
    externalLinkMenuWrapper: {
      [theme.breakpoints.down(681)]: {
        '& .MuiPaper-root': {
          left: 16,
          width: '100%',
        },
      },
    },
    mobileButtonWrapper: {
      padding: theme.spacing(6),
    },
    externalLinkMenuItem: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    linkTitle: {
      color: theme.palette.text.secondary,
    },
    btnTitle: {
      padding: theme.spacing(3, 8),
      minWidth: 'auto',
      justifyContent: 'flex-start',
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      borderRadius: 'unset',
    },
    btnIcon: {
      width: 24,
      display: 'flex',
      justifyContent: 'center',
    },
    btnTitleMobile: {
      padding: theme.spacing(4, 0),
      minWidth: 'auto',
      justifyContent: 'flex-start',
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      borderRadius: 'unset',
    },
    btnSubTitle: {
      color: theme.palette.redMiddle,
    },
  })
)
