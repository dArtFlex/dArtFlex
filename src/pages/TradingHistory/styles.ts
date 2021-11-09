import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.grey['50'],
      paddingBottom: theme.spacing(16),
      [theme.breakpoints.down(641)]: {
        padding: theme.spacing(4),
      },
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
      flexWrap: 'wrap',
    },
    tradingHistorySelect: {
      margin: theme.spacing(4, 0),
    },
    menuList: {
      top: '260px !important',
      [theme.breakpoints.down(681)]: {
        top: '240px !important',
      },
      [theme.breakpoints.down(506)]: {
        top: '320px !important',
      },
      [theme.breakpoints.down(358)]: {
        top: '376px !important',
      },
      [theme.breakpoints.down(308)]: {
        top: '420px !important',
      },
    },
  })
)
