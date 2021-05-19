import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(5.5),
    },
    titleBtnCotainer: {
      display: 'flex',
      marginLeft: 'auto',
      '&>button+button': {
        marginLeft: theme.spacing(2.5),
      },
    },
    infoRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: theme.spacing(2),
    },
    infoTitle: {
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    priceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    avatar: {
      display: 'inline-flex',
      marginRight: theme.spacing(2),
    },
    bitBtn: {
      marginBottom: theme.spacing(6),
    },
    bitBtnDisabled: {
      background: theme.palette.greyMid,
      '&.Mui-disabled': {
        color: theme.palette.white,
      },
    },
    bitBtnDisabledText: {
      color: theme.palette.white,
      lineHeight: 1.75,
    },
    tabContant: {
      overflow: 'auto',
    },
    infoRowIcon: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
      '& svg': {
        marginLeft: theme.spacing(1.5),
      },
    },
    externalLinkMenu: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(3),
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
    warningBox: {
      padding: theme.spacing(3, 6),
      marginBottom: theme.spacing(4),
      background: theme.palette.yellowLight,
      borderRadius: theme.spacing(2),
    },
    warningText: {
      fontSize: 16,
      fontWeight: 400,
      color: theme.palette.text.primary,
    },
    boldText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.palette.text.primary,
    },
    outerContainer: {
      position: 'sticky',
      top: theme.spacing(4),
    },
    formContainer: {
      minHeight: 680,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    formContant: {
      minWidth: 440,
      display: 'flex',
      alignItems: 'flex-start',
      borderRadius: 12,
      justifyContent: 'space-around',
      backgroundColor: theme.palette.greyPale,
      padding: theme.spacing(6, 8),
      flexDirection: 'column',
    },
    inputAdorment: {
      fontSize: '16px',
      fontWeight: 600,
      color: theme.palette.greyMid,
    },
    learnLink: {
      fontSize: 16,
      color: theme.palette.greyDark,
      fontWeight: 'bold',
    },
    externalLink: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
    },
    externalLinkText: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingLeft: theme.spacing(2),
    },
    bitViewBtn: {
      border: `2px solid ${theme.palette.text.primary}`,
      '&:hover': {
        border: `2px solid ${theme.palette.text.primary}`,
      },
    },
    timerBox: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.text.primary,
    },
    timerBoxBurn: {
      color: theme.palette.warning.main,
    },
    actionBtnIcon: {
      width: 20,
      height: 20,
      marginLeft: 0,
      marginRight: theme.spacing(2.5),
    },
    warningSubText: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  })
)
