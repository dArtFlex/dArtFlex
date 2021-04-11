import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      marginRight: theme.spacing(16),
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      flex: '1 0 auto',
    },
    navTabs: {
      padding: theme.spacing(5, 0),
    },
    navTabsContainer: {
      '&>div>div': {
        borderBottom: 'none',
      },
    },
    buttonContainer: {
      marginLeft: 'auto',
      padding: theme.spacing(3, 0),
      '&>button+button': {
        marginLeft: theme.spacing(4),
      },
    },
  })
)
