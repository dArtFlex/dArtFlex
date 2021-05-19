import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    asideTitle: {
      fontSize: 24,
      fontWeight: 700,
      color: theme.palette.text.primary,
      padding: theme.spacing(6, 0, 4),
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingBottom: theme.spacing(4),
    },
    mainText: {
      fontSize: 16,
      fontWeight: 400,
    },
    textListing: {
      fontSize: 16,
      fontWeight: 400,
      color: theme.palette.green,
    },
    link: {
      fontWeight: 700,
    },
    card: {
      background: theme.palette.greyPale,
      padding: theme.spacing(5),
      marginBottom: theme.spacing(6),
    },
    flexColumn: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    divider: {
      background: theme.palette.secondary.main,
      margin: theme.spacing(4, 0),
    },
  })
)
