import { makeStyles, Theme, createStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbarWrapper: {
      backgroundColor: theme.palette.redMiddle,
      color: theme.palette.white,
      display: 'flex',
      alignItems: 'center',
    },
    errorIcon: {
      color: `${theme.palette.white} !important`,
    },
  })
)
