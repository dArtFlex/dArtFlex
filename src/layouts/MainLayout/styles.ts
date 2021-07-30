import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      height: '100vh',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down('md')]: {
        height: 'auto',
        minHeight: '100vh',
      },
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      overflow: 'auto',
    },
  })
)
