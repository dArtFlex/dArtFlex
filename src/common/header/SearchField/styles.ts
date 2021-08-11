import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchInputBox: {
      background: theme.palette.grey['100'],
      marginRight: 24,
      width: 262,
      [theme.breakpoints.between(880, 960)]: {
        width: 180,
      },
      [theme.breakpoints.between(750, 880)]: {
        width: 140,
      },
      [theme.breakpoints.between(680, 750)]: {
        width: 110,
        marginRight: theme.spacing(2),
      },
      [theme.breakpoints.down(680)]: {
        width: '55vw',
        marginRight: theme.spacing(2),
      },
    },
    inputWrapper: {
      border: 'none',
    },
    searchInput: {
      paddingLeft: theme.spacing(3),
    },
    searchIcon: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.greyDark,
    },
  })
)
