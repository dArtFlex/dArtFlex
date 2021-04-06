import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '320px',
      color: theme.palette.text.primary,
    },
    mainContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      minHeight: '100vh',
    },
    main: {
      overflowX: 'auto',
    },
  })
)
