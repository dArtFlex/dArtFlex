import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.blackMain,
      padding: theme.spacing(0, 10),
      minHeight: 142,
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
        justifyContent: 'space-between',
        padding: theme.spacing(8, 10),
        alignItems: 'unset',
        minHeight: 'unset',
      },
      [theme.breakpoints.down(600)]: {
        padding: theme.spacing(8),
      },
      [theme.breakpoints.down(426)]: {
        padding: theme.spacing(8, 6),
      },
      [theme.breakpoints.down(320)]: {
        padding: theme.spacing(8, 3.5),
      },
    },
    logo: {
      [theme.breakpoints.up(640)]: {
        marginRight: theme.spacing(12),
      },
    },
    socialWrapper: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down(1000)]: {
        flexDirection: 'column',
        rowGap: 10,
        alignItems: 'unset',
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
      [theme.breakpoints.down(1000)]: {
        alignItems: 'unset',
      },
      [theme.breakpoints.down(375)]: {
        '& a': {
          fontSize: 14,
        },
      },
      [theme.breakpoints.down(320)]: {
        fontSize: 12,
      },
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
        [theme.breakpoints.down(375)]: {
          fontSize: 14,
        },
        [theme.breakpoints.down(320)]: {
          fontSize: 12,
        },
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
        textAlign: 'center',
      },
      [theme.breakpoints.down(1000)]: {
        flexDirection: 'column',
      },
    },
  })
)
