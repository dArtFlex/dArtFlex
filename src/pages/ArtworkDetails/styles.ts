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
    borderdIconButton: {
      border: `1px solid ${theme.palette.greyPale}`,
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
      color: theme.palette.text.secondary,
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
    infoRowIcon: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
      '& svg': {
        marginLeft: theme.spacing(1.5),
      },
    },
    externalLinkMenu: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(3),
    },
    externalLinkMenuItem: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    linkTitle: {
      color: theme.palette.text.secondary,
    },
    btnTitle: {
      padding: theme.spacing(3, 8),
      minWidth: 'auto',
      justifyContent: 'flex-start',
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      borderRadius: 'unset',
    },
    warningBox: {
      padding: theme.spacing(3, 6),
      marginBottom: theme.spacing(4),
      background: theme.palette.yellowLight,
      borderRadius: theme.spacing(2),
    },
    warningText: {
      fontSize: 16,
      fontWeight: 400,
      color: theme.palette.text.primary,
    },
    outerContainer: {
      position: 'sticky',
      top: theme.spacing(4),
    },
  })
)
