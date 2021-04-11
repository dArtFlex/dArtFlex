import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '1 1 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 440px',
      gridTemplateRows: 'minmax(100%, auto)',
      gridGap: theme.spacing(10),
      alignItems: 'start',
    },
    previewContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.ghostWhite,
      borderRadius: theme.spacing(3),
      minHeight: 680,
    },
    expandBtb: {
      position: 'absolute',
      bottom: theme.spacing(6),
      right: theme.spacing(6),
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(5.5),
    },
    titleBtnCotainer: {
      display: 'flex',
      marginLeft: 'auto',
      '&>button+button': {
        marginLeft: theme.spacing(2.5),
      },
    },
    infoRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: theme.spacing(2),
    },
    infoTitle: {
      marginBottom: theme.spacing(2),
    },
    avatar: {
      display: 'inline-flex',
      marginRight: theme.spacing(2),
    },
    bitBtn: {
      marginBottom: theme.spacing(6),
    },
    tabContant: {
      overflow: 'auto',
    },
  })
)
