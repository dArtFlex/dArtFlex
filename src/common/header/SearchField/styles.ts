import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchInputBox: {
      background: theme.palette.graySoft,
      marginRight: 24,
      width: 262,
    },
    searchInput: {
      paddingLeft: theme.spacing(3),
    },
  })
)
