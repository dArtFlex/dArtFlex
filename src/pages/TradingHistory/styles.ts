import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuTitle: {
      padding: theme.spacing(2, 4, 2, 7.5),
      outline: 'none',
      pointerEvents: 'none',
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
)
