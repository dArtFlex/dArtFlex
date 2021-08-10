import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flex: '1 1 auto',
    },
    toggleGroup: {
      display: 'grid',
      gridTemplateColumns: '270px 270px',
      gridAutoFlow: 'column',
      justifyContent: 'center',
      gap: theme.spacing(4),
      paddingBottom: theme.spacing(6),
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down(680)]: {
        gridTemplateColumns: '1fr 1fr',
      },
    },
    toggleBtnRoot: {
      padding: theme.spacing(6, 0),
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.secondary.main} !important`,
    },
    toggleBtnSelected: {
      backgroundColor: `#8566FF1A !important`,
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
  })
)
