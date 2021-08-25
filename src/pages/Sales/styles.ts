import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.grey['50'],
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
      gridTemplateColumns: 'repeat(auto-fill, minmax(325px, 1fr))',
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down(375)]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      [theme.breakpoints.down(320)]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
      },
    },
  })
)
