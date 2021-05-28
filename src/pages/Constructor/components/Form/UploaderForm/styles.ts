import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploaderContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      paddingBottom: theme.spacing(18),
    },
    dropZones: {
      display: 'flex',
      justifyContent: 'center',
      gap: 16,
      marginBottom: theme.spacing(8),
    },
    btnGenerate: {
      alignSelf: 'center',
      padding: theme.spacing(3.5, 5),
      margin: theme.spacing(0, 10, 0, 13),
      maxHeight: 50,
    },
    btnText: {
      color: theme.palette.white,
      fontSize: 16,
      fontWeight: 700,
    },
    previewCard: {
      position: 'relative',
      display: 'inherit',
    },
    btnClose: {
      position: 'absolute',
      top: 14,
      right: 20,
      minWidth: 40,
      height: 40,
      padding: 13,
      '& svg': {
        width: 14,
        height: 14,
      },
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },
    },
  })
)
