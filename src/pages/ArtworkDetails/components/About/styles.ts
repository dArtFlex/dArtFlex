import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1, 0),
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
    },
  })
)
