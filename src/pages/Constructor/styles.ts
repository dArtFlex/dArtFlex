import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.grey['50'],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(8),
      [theme.breakpoints.down(480)]: {
        padding: theme.spacing(4),
      },
    },
    clear: {
      background: 'transparent',
      alignItems: 'flex-start',
    },
    containerCardForm: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    mainTitle: {
      textAlign: 'center',
      paddingBottom: theme.spacing(6),
    },
    self: {
      textAlign: 'left',
    },
  })
)
