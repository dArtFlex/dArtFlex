import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timer: {
      padding: theme.spacing(2, 3),
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: '8px',
      fontSize: 18,
      lineHeight: 1.3,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
    },
    timerBurn: {
      color: theme.palette.warning.main,
    },
    icon: {
      margin: theme.spacing(0, 2, 0, 1),
    },
  })
)
