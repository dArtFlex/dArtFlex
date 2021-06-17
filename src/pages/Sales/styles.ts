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
    grid: {
      display: 'grid',
      gridGap: theme.spacing(6),
      gridTemplateColumns: '325px',
    },
  })
)
