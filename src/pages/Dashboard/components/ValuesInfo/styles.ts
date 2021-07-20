import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'inline-flex',
      padding: theme.spacing(6.5, 0),
      marginBottom: theme.spacing(7),
    },
    box: {
      padding: theme.spacing(0, 17),
    },
    infoRowIcon: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
      '& svg': {
        width: 20,
        height: 20,
        marginLeft: theme.spacing(1.5),
      },
    },
    helperText: {
      '& > p': {
        fontSize: 14,
        fontWeight: 700,
        color: theme.palette.text.secondary,
      },
    },
    tooltip: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      padding: theme.spacing(4, 6),
      fontSize: 16,
      minWidth: 416,
      boxShadow: theme.shadows[4],
      borderRadius: theme.spacing(3),
    },
  })
)
