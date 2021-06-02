import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      fontWeight: 600,
      padding: '10px 24px 10px 8px',
      '&$selected': {
        backgroundColor: theme.palette.background.default,
      },
    },
    selected: {
      '& $checkIcon': {
        visibility: 'visible',
      },
    },
    checkIcon: {
      color: theme.palette.primary.main,
      visibility: 'hidden',
      marginRight: theme.spacing(2),
    },
  })
)
