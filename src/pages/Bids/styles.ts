import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.grey['50'],
      paddingBottom: theme.spacing(16),
    },
    menuTitle: {
      padding: theme.spacing(2, 4, 2, 7.5),
      outline: 'none',
      pointerEvents: 'none',
    },
    cardBidContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      margin: theme.spacing(6, 0, 4),
    },
    bidContainer: {
      flex: '1 1 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 440px',
      gridTemplateRows: 'minmax(100%, auto)',
      gridGap: theme.spacing(10),
      alignItems: 'start',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
      },
    },
    previewContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.ghostWhite,
      borderRadius: theme.spacing(3),
      minHeight: 680,
      '&>img': {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      },
    },
    outerContainer: {},
    bidInfoBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  })
)
