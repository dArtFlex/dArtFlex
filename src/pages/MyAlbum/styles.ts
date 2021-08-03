import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    myAlbumWrapper: {
      padding: theme.spacing(8, 10, 20),
    },
    myAlbumPicsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(322px, 1fr))',
      gap: 20,
    },
    myAlbumPicWrapper: {
      height: 322,
      width: '100%',
      cursor: 'pointer',
      position: 'relative',
      '&>img': {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        objectFit: 'cover',
      },
    },
    picWrapperHover: {
      background: 'linear-gradient(0deg, rgba(34, 42, 44, 0.55), rgba(34, 42, 44, 0.55))',
      opacity: '50%',
    },
    picMenuBox: {
      position: 'absolute',
      top: 0,
      display: 'flex',
      alignItems: 'center',
    },
  })
)
