import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      maxWidth: 450,
      margin: 'auto',
      padding: theme.spacing(14, 0, 30),
    },
    form: {
      width: '100%',
      '& h1': {
        fontSize: 38,
        fontWeight: 'bold',
        lineHeight: '125%',
        marginBottom: theme.spacing(8),
      },
      '& h3': {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: '125%',
        marginBottom: theme.spacing(8),
      },
      '& input::placeholder': {
        fontWeight: 700,
        color: theme.palette.greyMid,
      },
    },
    section: {
      margin: theme.spacing(0, 0, 10),
    },
    verification: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      '& svg': {
        marginLeft: theme.spacing(3),
      },
    },
    verifyBtn: {
      margin: theme.spacing(6, 0, 2),
      border: `2px solid ${theme.palette.text.primary}`,
      '& svg': {
        fill: theme.palette.text.primary,
      },
    },
    socialsIcon: {
      fill: theme.palette.greyDark,
    },
  })
)
