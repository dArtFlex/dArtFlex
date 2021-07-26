import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flex: '1 1 auto',
      backgroundColor: theme.palette.grey['50'],
      [theme.breakpoints.down(768)]: {
        padding: theme.spacing(2, 6),
      },
      [theme.breakpoints.down(425)]: {
        padding: theme.spacing(2),
      },
    },
    toggleButton: {
      [theme.breakpoints.down(768)]: {
        padding: theme.spacing(2),
      },
      [theme.breakpoints.down(640)]: {
        width: '25%',
      },
      [theme.breakpoints.down(425)]: {
        padding: theme.spacing(1),
      },
    },
    linkIcon: {
      fill: theme.palette.text.primary,
    },
    container: {
      width: '100%',
    },
    grid: {
      display: 'grid',
      gridGap: theme.spacing(6),
      gridTemplateColumns: 'repeat(auto-fill, minmax(325px, 1fr))',
    },
    toggleGroup: {
      margin: theme.spacing(8, 0, 7),
      backgroundColor: theme.palette.background.paper,

      '& .MuiToggleButton-root.Mui-selected': {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.background.paper,
      },
      [theme.breakpoints.down(640)]: {
        width: '100%',
      },
    },
    inlineFlex: {
      display: 'inline-flex',
      flexDirection: 'column',
    },
  })
)
