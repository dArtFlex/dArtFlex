import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    libraryContainer: {
      position: 'relative',
      alignSelf: 'flex-start',
      width: '100%',
    },
    gallery: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(322px, 1fr))',
      gap: 20,
    },
  })
)
