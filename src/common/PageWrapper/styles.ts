import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 10),
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      overflow: 'auto',
    },
  })
)
