import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      //will be returned after beta ends
      // display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      maxWidth: 450,
      margin: 'auto',
      padding: theme.spacing(14, 0, 30),
      [theme.breakpoints.down(480)]: {
        padding: theme.spacing(4, 2, 10),
      },
    },
  })
)
