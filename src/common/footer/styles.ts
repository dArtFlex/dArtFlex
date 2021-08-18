import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.blackMain,
      minHeight: '142px',
      padding: theme.spacing(0, 10),
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(0, 2),
      },
      [theme.breakpoints.down(800)]: {
        flexWrap: 'wrap',
      },
      [theme.breakpoints.down(1000)]: {
        justifyContent: 'center',
      },
      [theme.breakpoints.down(641)]: {
        padding: theme.spacing(0, 4),
      },
    },
    logo: {
      [theme.breakpoints.up(640)]: {
        marginRight: theme.spacing(12),
      },
    },
    social: {
      color: theme.palette.grey5,

      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down(641)]: {
        gap: 20,
      },
      [theme.breakpoints.up(641)]: {
        '& a': {
          marginRight: theme.spacing(12),
        },
      },
      // '& a': {
      //   marginRight: theme.spacing(12),
      //   [theme.breakpoints.down('md')]: {
      //     marginRight: theme.spacing(8),
      //   },
      // },
      // [theme.breakpoints.down('md')]: {
      //   '& a': {
      //     marginLeft: theme.spacing(2),
      //   },
      // },
    },
    linksWrapper: {
      color: theme.palette.spanishGray,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      rowGap: 10,
      '& a': {
        color: theme.palette.spanishGray,
        textDecoration: 'none',
        marginLeft: theme.spacing(12),
        [theme.breakpoints.down(1280)]: {
          marginLeft: theme.spacing(4),
        },
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
  })
)
