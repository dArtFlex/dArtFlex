import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey['500'],
      borderRadius: theme.spacing(3),
      margin: theme.spacing(1, 0),
    },
    header: {
      padding: theme.spacing(3, 4),
    },
    avatar: {
      width: 40,
      height: 40,
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.greyPale : '',
    },
    action: {
      alignSelf: 'center',
      marginTop: 'inherit',
    },
    title: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.greyDark,
    },
    subheader: {
      fontSize: 16,
      color: theme.palette.text.primary,
      fontWeight: 'normal',
    },
    linkText: {
      color: theme.palette.lightViolet,
    },
    borderdIconButton: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.greyLight}`,
    },
    footer: {
      marginLeft: 56,
      padding: theme.spacing(0, 4, 3),
      '&.MuiCardContent-root:last-child': {
        paddingBottom: theme.spacing(3),
      },
    },
    footerBox: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    footerText: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.palette.greyDark,
      paddingTop: theme.spacing(3),
    },
    cardBtn: {
      fontSize: 14,
      '&:hover': {
        backgroundColor: 'transparent',
      },
      color: theme.palette.error.main,
    },
    cardAcceptBtn: {
      color: theme.palette.green,
      fontSize: 14,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    cardAcceptBtnIcon: {
      fill: theme.palette.primary.main,
    },
    strike: {
      textDecoration: 'line-through',
    },
  })
)
