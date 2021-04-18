import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.text.primary,
      minHeight: '142px',
      padding: theme.spacing(0, 10),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        flexWrap: 'wrap',
        padding: theme.spacing(0, 2),
      },
    },
    logo: {
      marginRight: theme.spacing(12),
    },
    social: {
      color: theme.palette.grey5,
      '& a': {
        marginRight: theme.spacing(12),
      },
      [theme.breakpoints.down('md')]: {
        '& a': {
          marginLeft: theme.spacing(2),
        },
      },
    },
    linksWrapper: {
      color: theme.palette.spanishGray,
      '& a': {
        marginLeft: theme.spacing(12),
      },
      [theme.breakpoints.down('md')]: {
        '& a': {
          marginLeft: theme.spacing(3),
        },
      },
    },
  })
)
