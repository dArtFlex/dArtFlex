import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.greyPale,
      paddingBottom: theme.spacing(16),
    },
    menuTitle: {
      padding: theme.spacing(2, 4, 2, 7.5),
      outline: 'none',
      pointerEvents: 'none',
    },
    cardBidContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      margin: theme.spacing(6, 0, 4),
    },
  })
)
