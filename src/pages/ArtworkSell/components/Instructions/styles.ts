import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootAccordion: {
      background: theme.palette.greyPale,
      borderRadius: theme.spacing(3),
      marginBottom: theme.spacing(20),
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&.Mui-expanded': {
        margin: 0,
      },
      '&.Mui-expanded:last-child': {
        marginBottom: theme.spacing(20),
      },
    },
    expandedAccordion: {
      margin: 'auto',
    },
    rootSummary: {
      borderRadius: theme.spacing(3),
      padding: theme.spacing(0, 6),
      boxShadow: 'none',
      '&:not(:last-child)': {
        minHeight: 56,
        maxHeight: 56,
        borderBottom: 0,
        margin: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    detailsSummary: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    contentSummary: {
      '&$expanded': {
        margin: 0,
      },
    },
    expandedSummary: {},
    rootDetails: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0, 6),
    },
    summaryTitle: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.primary,
    },
    mainText: {
      fontSize: 16,
      fontWeight: 400,
      paddingBottom: theme.spacing(6),
      lineHeight: '24px',
    },
  })
)
