import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toggleGroup: {
      display: 'grid',
      gridTemplateColumns: '270px 270px',
      gridAutoFlow: 'column',
      justifyContent: 'center',
      gap: theme.spacing(4),
      paddingBottom: theme.spacing(6),
    },
    toggleBtnRoot: {
      padding: theme.spacing(6, 0),
      background: theme.palette.background.default,
      border: `1px solid ${theme.palette.secondary.main} !important`,
    },
    toggleBtnSelected: {
      background: `${theme.palette.primary.light} !important`,
      border: `1px solid ${theme.palette.primary.main} !important`,
    },
    toggleBtnLabel: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.primary.main,
      paddingBottom: theme.spacing(2),
    },
    formTitle: {
      color: theme.palette.text.primary,
      padding: theme.spacing(8, 0, 6),
    },
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
    field: {
      marginBottom: 0,
    },
  })
)
