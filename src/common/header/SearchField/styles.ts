import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchInputBox: {
      background: theme.palette.grey['100'],
      marginRight: 24,
      width: 262,
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
