import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 0),
      height: 248,
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        margin: theme.spacing(1, 0),
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey['400'],
        borderRadius: 30,
      },
    },
    header: {
      padding: theme.spacing(3, 4),
    },
    avatar: {
      width: 64,
      height: 64,
    },
    title: {
      fontSize: 30,
      fontWeight: 700,
      color: theme.palette.text.primary,
    },
    subheader: {
      fontSize: 16,
      color: theme.palette.text.primary,
      fontWeight: 700,
    },
    footer: {
      padding: theme.spacing(0, 4, 3),
      '&.MuiCardContent-root:last-child': {
        paddingBottom: theme.spacing(3),
      },
    },
    footerText: {
      fontSize: 16,
      fontWeight: 'normal',
      whiteSpace: 'pre',
    },
  })
)
