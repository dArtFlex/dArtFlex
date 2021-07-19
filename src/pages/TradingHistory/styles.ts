import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.grey['50'],
      paddingBottom: theme.spacing(16),
    },
    selectBackgroundColor: {
      background: theme.palette.background.paper,

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey['200'],
      },
      '& .MuiSelect-select:focus': {
        background: theme.palette.background.paper,
      },
    },
    menuTitle: {
      padding: theme.spacing(2, 4, 2, 7.5),
      outline: 'none',
      pointerEvents: 'none',
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
)
