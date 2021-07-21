import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flex: '1 1 auto',
      backgroundColor: theme.palette.grey['50'],
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
    },
    inlineFlex: {
      display: 'inline-flex',
      flexDirection: 'column',
    },
  })
)
