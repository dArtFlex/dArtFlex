import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      cursor: 'pointer',
    },
    tooltip: {
      position: 'absolute',
      background: theme.palette.white,
      padding: theme.spacing(1, 2),
      border: theme.spacing(1),
      zIndex: 9999,
      opacity: 0.9,
    },
  })
)
