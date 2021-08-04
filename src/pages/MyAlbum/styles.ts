import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myAlbumWrapper: {
      padding: theme.spacing(8, 10, 20),
      [theme.breakpoints.down(425)]: {
        padding: theme.spacing(8, 4, 6),
      },
    },
    myAlbumPicsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(322px, 1fr))',
      gap: 20,
      [theme.breakpoints.down(425)]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      [theme.breakpoints.down(320)]: {
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      },
    },
    myAlbumPicWrapper: {
      height: 322,
      width: '100%',
      cursor: 'pointer',
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
      '&>img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      [theme.breakpoints.down(425)]: {
        height: 300,
      },
      [theme.breakpoints.down(320)]: {
        height: 260,
      },
    },
    myAlbumPicWrapperHover: {
      backgroundColor: theme.palette.blackMain,
    },
    picWrapperHover: {
      display: 'flex',
      justifyContent: 'center',
      opacity: 0.55,
    },
    picMenuBox: {
      top: 0,
      position: 'absolute',
      opacity: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 20,
      height: '100%',
      width: 'inherit',
    },
    albumActionBtns: {
      marginTop: '23%',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    albumActionButton: {
      backgroundColor: theme.palette.white,
      color: theme.palette.blackMain,
      width: 'fit-content',
      '&:hover': {
        backgroundColor: theme.palette.white,
        color: theme.palette.blackMain,
        opacity: 0.8,
      },
      padding: theme.spacing(3),
    },
    deleteIcon: {
      color: theme.palette.redMiddle,
      '&:hover': {
        color: theme.palette.redMiddle,
      },
    },
    modalWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4, 4, 18),
      borderRadius: 12,
      color: theme.palette.text.primary,
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      outline: 'none',
      position: 'relative',
    },
    dialogCloseIcon: {
      marginLeft: 'auto',
      border: `1px solid ${theme.palette.greyDark}`,
      color: theme.palette.text.primary,
      '&>span>svg': {
        transform: 'rotate(45deg)',
      },
    },
    zoomCloseIcon: {
      backgroundColor: theme.palette.background.paper,
      position: 'absolute',
      top: 40,
      right: 40,
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        opacity: 0.9,
      },
      [theme.breakpoints.down(901)]: {
        top: 16,
        right: 16,
      },
    },
    modalInfo: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '&>h2': {
        textAlign: 'center',
      },
    },
    modalButtons: {
      marginTop: theme.spacing(8),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      '&>button': {
        width: 140,
        height: 50,
        padding: theme.spacing(2, 6),
      },
    },
    deleteButton: {
      backgroundColor: theme.palette.redMiddle,
      color: theme.palette.white,
      '&:hover': {
        backgroundColor: theme.palette.redMiddle,
        opacity: '80%',
      },
    },
    uploadButton: {
      backgroundColor: theme.palette.blackMain,
      color: theme.palette.white,
      '&:hover': {
        backgroundColor: theme.palette.blackMain,
        color: theme.palette.white,
        opacity: '80%',
      },
    },
    cancelButton: {
      border: `2px solid ${theme.palette.text.primary}`,
    },
    downloadButton: {
      backgroundColor: theme.palette.white,
      color: theme.palette.blackMain,
      '&:hover': {
        backgroundColor: theme.palette.white,
        color: theme.palette.blackMain,
        opacity: '80%',
      },
    },
    zoomImage: {
      width: 'inherit',
      objectFit: 'contain',
      borderRadius: theme.spacing(3),
      maxHeight: 630,
      maxWidth: '96%',
    },
    zoomButtons: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 8,
      rowGap: 12,
      marginTop: theme.spacing(4),
      '&>button': {
        width: 130,
      },
    },
    flexBoxColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  })
)
