import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionTitle: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingBottom: theme.spacing(4),
    },
    mainText: {
      fontSize: 16,
      fontWeight: 700,
    },
    divider: {
      background: theme.palette.secondary.main,
      margin: theme.spacing(8, 0),
    },
    flexColumn: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flexBox: {
      display: 'flex',
      gap: 20,
    },
    field: {
      marginBottom: 0,
    },
    sectionTitleBox: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingBottom: theme.spacing(4),
    },
  })
)
