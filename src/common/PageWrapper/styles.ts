import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 10),
      [theme.breakpoints.down(681)]: {
        padding: theme.spacing(4),
      },
      flex: '1 1 auto',
    },
    banner: {
      borderRadius: 20,
      margin: '4px auto',
      padding: theme.spacing(2, 4),
      width: 'fit-content',
      backgroundColor: theme.palette.lightViolet,
      color: theme.palette.white,
    },
  })
)
