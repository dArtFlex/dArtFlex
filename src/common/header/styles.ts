import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      marginRight: theme.spacing(16),
    },
    toolbar: {
      backgroundColor: theme.palette.white,
      borderBottom: `1px solid ${theme.palette.greyLight}`,
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
