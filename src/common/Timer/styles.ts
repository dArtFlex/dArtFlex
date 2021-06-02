import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timer: {
      maxWidth: 'fit-content',
      padding: theme.spacing(2, 3),
      backgroundColor: theme.palette.white,
      color: theme.palette.text.primary,
      borderRadius: '8px',
      fontSize: 18,
      lineHeight: 1.3,
      fontWeight: 600,
    },
    timerBurn: {
      color: theme.palette.warning.main,
    },
    icon: {
      margin: theme.spacing(0, 2, 0, 1),
    },
  })
)
