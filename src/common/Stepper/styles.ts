import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: 'transparent',
      [theme.breakpoints.down(360)]: {
        padding: theme.spacing(6, 0),
      },
      '& .MuiStepLabel-horizontal': {
        flexDirection: 'column',
        textAlign: 'center',
        gap: theme.spacing(2),
      },
    },
    root: {
      color: theme.palette.greyMid,
      display: 'flex',
      height: 22,
      alignItems: 'center',
      zIndex: 1,
    },
    active: {
      color: theme.palette.violet,
    },
    circle: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: theme.palette.violet,
      fontSize: 18,
      background: theme.palette.background.default,
    },
  })
)
