import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chipBtn: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
      padding: theme.spacing(2.5, 5),
      margin: theme.spacing(0, 1.5),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& .MuiButton-iconSizeMedium > *:first-child': {
        fontSize: 14,
      },
    },
    avatar: {
      width: 20,
      height: 20,
      background: 'linear-gradient(129.22deg, #5239AE 6.8%, #7F82F5 134.28%)',
    },
  })
)
