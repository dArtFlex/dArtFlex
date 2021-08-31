import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chipBtn: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
      padding: theme.spacing(2.5, 4),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiButton-iconSizeMedium > *:first-child': {
        fontSize: 14,
      },
      [theme.breakpoints.down(1024)]: {
        padding: theme.spacing(2.5, 2),
      },
      [theme.breakpoints.down(840)]: {
        padding: theme.spacing(2.5, 0),
      },
      [theme.breakpoints.down(740)]: {
        minWidth: 36,
      },
    },
    avatar: {
      width: 20,
      height: 20,
      background: 'linear-gradient(129.22deg, #5239AE 6.8%, #7F82F5 134.28%)',
    },
  })
)
