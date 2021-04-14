import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '600px',
      color: theme.palette.text.primary,
      height: '100vh',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down('md')]: {
        height: 'auto',
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
