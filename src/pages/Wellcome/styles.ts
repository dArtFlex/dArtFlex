import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100vh',
      background: '#333',
    },
    wellcome: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 57,
    },
    inlineBox: {
      display: 'inline-box',
      position: 'relative',
    },
    title: {
      color: theme.palette.lightViolet,
    },
    navLink: {
      color: theme.palette.lightViolet,
      marginLeft: theme.spacing(1),
    },
    vector: {
      position: 'absolute',
      top: 30,
      left: 0,
    },
    btn: {},
  })
)
