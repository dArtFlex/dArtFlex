import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flex: '1 1 auto',
      backgroundColor: theme.palette.greyPale,
    },
    linkIcon: {
      fill: theme.palette.text.primary,
    },
    container: {
      width: '100%',
    },
    grid: {
      display: 'grid',
      gridGap: theme.spacing(6),
      gridTemplateColumns: 'repeat(auto-fit, minmax(325px, 1fr))',
    },
    toggleGroup: {
      margin: theme.spacing(8, 0, 7),
    },
  })
)
