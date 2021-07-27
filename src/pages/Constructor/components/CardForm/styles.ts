import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardForm: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minWidth: 372,
      minHeight: 378,
      gap: 54,
      borderRadius: theme.spacing(3),
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(34, 42, 44, 0.05)',
      },
      [theme.breakpoints.down(480)]: {
        minWidth: 310,
        minHeight: 314,
      },
    },
  })
)
