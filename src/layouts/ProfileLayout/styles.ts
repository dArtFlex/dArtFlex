import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cover: {
      width: 'auto',
      height: 300,
      margin: theme.spacing(-4, -10, 0),
    },
    container: {
      display: 'flex',
      gap: theme.spacing(5),
    },
    aside: {
      maxWidth: 325,
      marginTop: theme.spacing(-25),
    },
  })
)
